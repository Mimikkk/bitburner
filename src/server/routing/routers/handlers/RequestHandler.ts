import { RouteRequestContext } from "@server/routing/routers/routes/requests/RouteRequestContext.ts";

export interface RequestHandler {
  handle(request: Request, context: RouteRequestContext): Promise<Response> | Response;
}
