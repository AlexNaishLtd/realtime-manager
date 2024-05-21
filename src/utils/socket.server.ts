import Pusher from 'pusher';
import { env } from '@/env.mjs';

type ServerClientProps = {
  appId: string;
  key: string;
  secret: string;
}

export const makeClient = ({ appId, key, secret }: ServerClientProps) => {
  return new Pusher({
    appId,
    key,
    secret,
    useTLS: true,
    host: `${env.SOKETI_HOST}${env.SOKETI_PATH}`,
    timeout: 4000,
  });
}