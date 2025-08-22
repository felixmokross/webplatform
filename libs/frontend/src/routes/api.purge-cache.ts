import { ActionFunctionArgs } from "react-router";
import { isAuthenticated } from "../auth.server";
import { cms } from "../cms.server";

export async function action({ request }: ActionFunctionArgs) {
  if (!(await isAuthenticated(request))) {
    return new Response(null, { status: 401 });
  }

  console.log(`Purging cache`);
  await cms().purgeCache();
  console.log(`Cache purged`);

  return new Response(null, { status: 204 });
}
