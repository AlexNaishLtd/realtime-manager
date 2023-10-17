import PusherJS from 'pusher-js';

export const makeClient = (key: string) => {
  return new PusherJS(key, {
    wsHost: process.env.SOKETI_HOST,
    forceTLS: true,
    enabledTransports: ['wss', 'ws'],
    cluster: process.env.SOKETI_HOST as string,
  });
}
