import { ControlFn } from "@server/application/controllers/controller.types.ts";
import { RequestControllerHandler } from "@server/infrastructure/routing/routers/handlers/RequestControllerHandler.ts";
import { HttpRouteMatcher } from "@server/infrastructure/routing/routers/protocols/http/HttpRouteMatcher.ts";
import { ControllerRegistry } from "@server/infrastructure/routing/routers/Router.controllers.ts";
import { Router } from "@server/infrastructure/routing/routers/Router.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { TypeKey } from "@shared/types/typedKey.ts";

export class HttpRouterBuilder<R extends Route[] = Route[]> {
  static create(): HttpRouterBuilder<[]> {
    return new HttpRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  add<
    M extends HttpMethod,
    P extends `/${string}`,
    C extends { create(): { [key in H]: ControlFn } },
    H extends TypeKey<ReturnType<C["create"]>, ControlFn>,
  >(
    method: M,
    path: P,
    Controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const controller = ControllerRegistry.resolve(Controller);

    const route = Route.create(
      url,
      HttpRouteMatcher.create(method, url),
      RequestControllerHandler.create(controller, handler),
    );

    this.routes.push(route);

    return this as unknown as HttpRouterBuilder<[...R, Route]>;
  }

  build(): Router<R> {
    return Router.create(this.routes);
  }
}
