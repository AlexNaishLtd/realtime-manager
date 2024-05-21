import { z } from 'zod';
import { t } from '@/server/trpc';
import { makeClient } from '@/utils/socket.server';

export const broadcast = t.procedure
  .input(
    z.object({
      applicationId: z.string(),
      channelName: z.string(),
      eventName: z.string(),
      eventData: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
    const app = await ctx.db.application.get(input.applicationId);

    const client = makeClient({ appId: app.AppId, key: app.AppKey, secret: app.AppSecret });
    await client.trigger(input.channelName, input.eventName, input.eventData);
  });
