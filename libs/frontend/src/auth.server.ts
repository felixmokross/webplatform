import { cms } from "./cms.server";
import { sessions } from "./sessions.server";

export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await sessions().getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return true;
  }

  const authHeaderValue = request.headers.get("Authorization");

  if (!authHeaderValue) {
    return false;
  }

  // TODO consider validating the token here using the Payload secret instead of having to request the CMS
  // Do we use a JWT in all cases, though?
  const result = await cms().fetchCms("/api/users/me", {
    headers: { Authorization: authHeaderValue },
  });
  return result.ok && !!(await result.json()).user?.id;
}
