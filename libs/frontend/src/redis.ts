import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error("REDIS_URL is not defined");

if (!globalThis.redis) {
  globalThis.redis = createClient({ url: redisUrl });
  globalThis.redis.connect();
}

export const redis = globalThis.redis as ReturnType<typeof createClient>;

redis.on("error", (err) => console.error("Redis Client Error", err));

declare global {
  var redis: ReturnType<typeof createClient> | undefined;
}

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing Redis connection...");
  await redis.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing Redis connection...");
  await redis.quit();
  process.exit(0);
});
