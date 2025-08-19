// app/sessions.ts
import { createCookieSessionStorage } from "react-router"; // or cloudflare/deno

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

if (!process.env.CANONICAL_HOSTNAME) {
  throw new Error("CANONICAL_HOSTNAME is required");
}
if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET is required");

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",

      domain: process.env.CANONICAL_HOSTNAME,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: true,
      secrets: [process.env.SESSION_SECRET],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
