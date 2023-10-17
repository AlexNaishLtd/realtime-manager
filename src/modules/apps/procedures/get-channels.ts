import { z } from 'zod';
import { t } from '@/server/trpc';
import { makeClient } from '@/utils/socket.server';

export const getChannels = t.procedure
  .input(z.string().min(1))
  .query(async ({ ctx, input }) => {
    const app = await ctx.db.apps.findUniqueOrThrow({
      where: {
        id: input
      },
      select: {
        id: true,
        key: true,
        secret: true
      }
    });

    const client = makeClient({ appId: app.id, key: app.key, secret: app.secret });
    const res = await client.get({ path: "/channels" });
    const body = await res.json();
    return Object.keys(body.channels).map(channelName => {
      return (
        {
          name: channelName,
          users: body.channels[channelName].subscription_count
        }
      )
    });
  });
