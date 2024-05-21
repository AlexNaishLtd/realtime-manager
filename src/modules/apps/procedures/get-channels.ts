import type { UserChannelData } from 'pusher';
import { z } from 'zod';
import { t } from '@/server/trpc';
import { makeClient } from '@/utils/socket.server';
import { TRPCError } from '@trpc/server';

export const getChannels = t.procedure
  .input(z.string().min(1))
  .query(async ({ ctx, input }) => {
    const app = await ctx.db.application.get(input);
    const client = makeClient({ appId: app.AppId, key: app.AppKey, secret: app.AppSecret });

    try {
      const res = await client.get({ path: "/channels" });
      const body = await res.json() as { channels: Record<string, UserChannelData> };
      return Object.keys(body.channels).map(channelName => {
        return (
          {
            name: channelName,
            users: body.channels[channelName]!.subscription_count as number
          }
        )
      });
    } catch (error) {
      console.log('get-channels error', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  });
