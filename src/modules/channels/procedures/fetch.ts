import { z } from 'zod';
import { t } from '@/server/trpc';
import { makeClient } from '@/utils/socket.server';

export const fetch = t.procedure
  .input(z.object({
    appId: z.string().min(1),
    appKey: z.string().min(1),
    appSecret: z.string().min(1),
    channelName: z.string().min(1),
  }))
  .query(async ({ ctx, input }) => {
    const client = makeClient({ appId: input.appId, key: input.appKey, secret: input.appSecret });
    const res = await client.get({ path: `/channels/${input.channelName}` });
    const body = await res.json();
    return body;
  });
