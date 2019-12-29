import { IncomingMessage, ServerResponse, Server } from 'http';

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

export {
  IM,
  SR,
  AP,
  Server,
};
