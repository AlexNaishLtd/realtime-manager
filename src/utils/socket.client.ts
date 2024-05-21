import PusherJS from 'pusher-js';
import { env } from '@/env.mjs';

export const makeClient = (key: string) => {
  return new PusherJS(key, {
    wsHost: env.NEXT_PUBLIC_SOKETI_HOST,
    wsPath: env.NEXT_PUBLIC_SOKETI_PATH,
    forceTLS: true,
    enabledTransports: ['wss', 'ws'],
    cluster: `${env.NEXT_PUBLIC_SOKETI_HOST}${env.NEXT_PUBLIC_SOKETI_PATH}`,
    unavailableTimeout: 2000
  });
}
