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
    const app = await ctx.db.apps.findUniqueOrThrow({
      where: {
        id: input.applicationId
      },
      select: {
        id: true,
        key: true,
        secret: true
      }
    });

    const client = makeClient({ appId: app.id, key: app.key, secret: app.secret });
    await client.trigger(input.channelName, input.eventName, input.eventData);
  });
