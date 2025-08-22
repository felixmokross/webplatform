import { routes } from "@fxmk/frontend";
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), ...routes] satisfies RouteConfig;
