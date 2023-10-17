import Pusher from 'pusher';

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
    host: process.env.SOKETI_HOST as string
  });
}