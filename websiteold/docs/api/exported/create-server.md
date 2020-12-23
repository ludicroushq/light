---
id: create-server
title: createServer
---

## `createServer(opts: CreateServerOptions): LightServer`

TODO: coming soon

### `CreateServerOptions`

```typescript
interface CreateServerOptions {
  youch?: boolean;
  requestLogger?: boolean;
}
```
### `LightServer`

```typescript
interface LightServer {
  server: Server;
  router: any;
  reload: () => void;
}
```
