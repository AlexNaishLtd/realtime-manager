import { z } from 'zod';
import { nanoid } from 'nanoid';
import { t } from '@/server/trpc';

export const create = t.procedure
  .input(
    z.object({
      name: z.string(),
      enabled: z.boolean()
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.application.create({
      AppId: nanoid(32),
      AppName: input.name,
      AppKey: nanoid(),
      AppSecret: nanoid(),
      MaxConnections: -1,
      MaxBackendEventsPerSecond: -1,
      MaxClientEventsPerSecond: -1,
      MaxReadRequestsPerSecond: -1,
      Enabled: input.enabled,
      EnableUserAuthentication: false,
      EnableClientMessages: false
    })
  });