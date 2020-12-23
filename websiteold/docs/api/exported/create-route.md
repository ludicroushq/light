---
id: create-route
title: createRoute
---

## `createRoute(): CreateRoute`

TODO: coming soon

### `type CreateRoute`

```typescript
type CreateRoute = Record<HTTPMethod, HandlerMethod> & {
  all: HandlerMethod;
  route: AnyRoute;
  useMiddleware: (middleware: Middleware, methods?: HTTPMethod[]) => void;
  usePlugin: (plugin: Plugin, methods?: HTTPMethod[]) => void;
  useConnect: (connect: any, methods?: HTTPMethod[]) => void;
  run: typeof run;
};
```
