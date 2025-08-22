// app/sessions.ts
import { createCookieSessionStorage, SessionStorage } from "react-router"; // or cloudflare/deno

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

declare global {
  var _sessions: SessionStorage<SessionData, SessionFlashData> | undefined;
}

export function sessions() {
  if (!globalThis._sessions) {
    throw new Error("Sessions not initialized. Call initializeSessions first.");
  }
  return globalThis._sessions;
}

type SessionsInit = {
  canonicalHostname: string;
  sessionSecret: string;
};

export function initializeSessions(init: SessionsInit) {
  if (!globalThis._sessions) {
    globalThis._sessions = createCookieSessionStorage<
      SessionData,
      SessionFlashData
    >({
      cookie: {
        name: "__session",

        domain: init.canonicalHostname,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: true,
        secrets: [init.sessionSecret],
        secure: true,
      },
    });
  }
}
