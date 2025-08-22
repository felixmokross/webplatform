import { ActionFunctionArgs, redirect } from "react-router";
import { sessions } from "../sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return {
      status: 405,
      statusText: "Method Not Allowed",
      headers: {
        Allow: "POST",
      },
    };
  }

  const session = await sessions().getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessions().destroySession(session),
    },
  });
}
