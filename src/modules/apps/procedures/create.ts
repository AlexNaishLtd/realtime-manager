import { z } from 'zod';
import { t } from '@/server/trpc';
import { nanoid } from 'nanoid'

export const create = t.procedure
  .input(
    z.object({
      name: z.string(),
      enabled: z.coerce.number()
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.apps.create({
      data: {
        name: input.name,
        key: nanoid(),
        secret: nanoid(),
        max_connections: -1,
        max_backend_events_per_sec: -1,
        max_client_events_per_sec: -1,
        max_read_req_per_sec: -1,
        enabled: input.enabled,
        enable_user_authentication: 0,
        enable_client_messages: 0
      }
    })
  });