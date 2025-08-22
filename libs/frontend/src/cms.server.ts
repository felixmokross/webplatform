import { createClient } from "redis";
import { BRANDS_DEPTH, PAGE_DEPTH } from "./cms";
import { Brand, Common, Page, Redirect, Settings } from "./cms-plugin-types";

type CmsInit = {
  baseUrl: string;
  apiKey: string;
  redisUrl: string;
};

declare global {
  var _cms: Cms | undefined;
}

export function cms() {
  if (!globalThis._cms) {
    throw new Error("CMS not initialized. Call initializeCms first.");
  }
  return globalThis._cms;
}

export function initializeCms(init: CmsInit) {
  if (!globalThis._cms) {
    globalThis._cms = new Cms(init);

    process.on("SIGINT", () => globalThis._cms?.dispose());
    process.on("SIGTERM", () => globalThis._cms?.dispose());
  }
}

const CACHE_EXPIRY_IN_MS = 1000 * 60; // 1 min

export class Cms {
  private readonly _redis: ReturnType<typeof createClient>;

  constructor(private init: CmsInit) {
    this._redis = createClient({ url: init.redisUrl });
    this._redis.on("error", (err) => console.error("Redis Client Error", err));
  }

  private async redis() {
    if (!this._redis.isOpen) {
      await this._redis.connect();
    }
    return this._redis;
  }

  async loadData(
    pathname: string,
    locale: string | null,
    depth: number,
    queryParams: Record<string, string>,
  ) {
    const url = new URL(`/api/${pathname}`, this.init.baseUrl);
    if (locale) {
      url.searchParams.set("locale", locale);
    }
    url.searchParams.set("depth", depth.toString());
    url.searchParams.set("draft", "false");
    url.searchParams.set("pagination", "false");
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    console.log(`Loading data from CMS for ${url.toString()} in ${locale}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `api-keys API-Key ${this.init.apiKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;

      throw new Error(`Failed to load data from CMS: ${response.status}`);
    }

    return await response.json();
  }

  dispose() {
    if (this._redis.isOpen) {
      this._redis.destroy();
    }
  }

  async purgeCache() {
    await (await this.redis()).flushDb();
  }

  async tryGetLocalizedPathname(
    request: Request,
    pathname: string,
    locale: string,
  ) {
    return await this.getData<{ localizedPathname: string }, string | null>(
      request,
      `pages/localized-pathname`,
      `localized-pathname:${pathname.substring(1).replaceAll("/", ":") || "index"}`,
      locale,
      0,
      { pathname },
      (data) => (data ? data.localizedPathname : null),
    );
  }

  async tryGetPage(request: Request, pathname: string, locale: string) {
    return await this.getData<{ docs: Page[] }, Page>(
      request,
      `pages`,
      `pages:${pathname.substring(1).replaceAll("/", ":") || "index"}`,
      locale,
      PAGE_DEPTH,
      {
        "where[pathname][equals]": pathname,
        limit: 1,
      },
      (data) => (data && data.docs.length > 0 ? data.docs[0] : null),
    );
  }

  async tryGetRedirect(request: Request, pathname: string, locale: string) {
    return await this.getData<{ docs: Redirect[] }, Redirect>(
      request,
      `redirects`,
      `redirects:${pathname.substring(1).replaceAll("/", ":") || "index"}`,
      locale,
      1,
      {
        "where[fromPathname][equals]": pathname,
        limit: 1,
      },
      (data) => (data && data.docs.length > 0 ? data.docs[0] : null),
    );
  }

  async getCommon(request: Request, locale: string) {
    const common = (await this.getData(
      request,
      "globals/common",
      "globals:common",
      locale,
      2,
    )) as Common | null;
    if (!common) throw new Error("Could not load Common global");

    return common;
  }

  async getSettings(request: Request, locale: string | null = null) {
    const settings = (await this.getData(
      request,
      "globals/settings",
      "globals:settings",
      locale,
      2,
    )) as Settings | null;
    if (!settings) throw new Error("Could not load Settings global");

    return settings;
  }

  async getBrands(request: Request, locale: string) {
    const brands = (await this.getData(
      request,
      "brands",
      "brands",
      locale,
      BRANDS_DEPTH,
    )) as {
      docs: Brand[];
    } | null;
    if (!brands) throw new Error("Could not load Brands collection");

    return brands.docs;
  }

  private async getData<TData, TResult>(
    req: Request,
    pathname: string,
    cacheKey: string,
    locale: string | null,
    depth = 1,
    queryParams = {},
    getResultFn: (data: TData | null) => TResult | null = (
      data: TData | null,
    ) => data as TResult,
  ) {
    const cacheKeyWithLocale = `${cacheKey}${locale ? `:${locale}` : ""}`;

    if (new URL(req.url).searchParams.get("skipcache") === "true") {
      console.log(
        `Skipping cache for ${cacheKeyWithLocale} (?skipcache=true was specified)`,
      );
      return getResultFn(
        await this.loadData(pathname, locale, depth, queryParams),
      );
    }

    const cacheEntryString = await (await this.redis()).get(cacheKeyWithLocale);
    const cacheEntry = cacheEntryString
      ? (JSON.parse(cacheEntryString) as CacheEntry<TResult>)
      : null;

    if (cacheEntry) {
      queueMicrotask(async () => {
        try {
          const cacheLastModified = cacheEntry.cachedAt;

          const cacheExpired =
            new Date(cacheLastModified).getTime() + CACHE_EXPIRY_IN_MS <
            Date.now();
          if (!cacheExpired) {
            console.log(`Cache not expired for ${cacheKeyWithLocale}`);
            return;
          }

          console.log(`Cache expired for ${cacheKeyWithLocale}`);
          await this.loadAndCacheData(
            pathname,
            locale,
            cacheKeyWithLocale,
            depth,
            queryParams,
            getResultFn,
          );
        } catch (e) {
          // As this runs in the background, just log the error
          console.warn(
            `Failed to refresh cache in microtask for ${cacheKeyWithLocale} (expected if data was deleted): ${e}`,
          );
        }
      });

      console.log(`Cache hit for ${cacheKeyWithLocale}`);
      return cacheEntry.data;
    }

    console.log(`Cache miss for ${cacheKeyWithLocale}`);
    return await this.loadAndCacheData(
      pathname,
      locale,
      cacheKeyWithLocale,
      depth,
      queryParams,
      getResultFn,
    );
  }

  private async loadAndCacheData<TData, TResult>(
    url: string,
    locale: string | null,
    cacheKeyWithLocale: string,
    depth: number,
    queryParams: Record<string, string>,
    getResultFn: (data: TData | null) => TResult | null,
  ) {
    const result = getResultFn(
      await this.loadData(url, locale, depth, queryParams),
    );

    if (result) {
      await this.cacheData(cacheKeyWithLocale, result);
    } else {
      console.log(`Deleting data for ${cacheKeyWithLocale} (if exists)`);
      await (await this.redis()).del(cacheKeyWithLocale);
    }

    return result;
  }

  private async cacheData(cacheKeyWithLocale: string, data: object) {
    console.log(`Caching data to ${cacheKeyWithLocale}`);

    await (
      await this.redis()
    ).set(
      cacheKeyWithLocale,
      JSON.stringify({
        data,
        cachedAt: new Date().toJSON(),
      } as CacheEntry<object>),
    );
  }

  public async fetchCms(url: string, requestInit?: RequestInit) {
    return await fetch(`${this.init.baseUrl}${url}`, requestInit);
  }
}

type CacheEntry<T> = {
  data: T;
  cachedAt: string;
};
