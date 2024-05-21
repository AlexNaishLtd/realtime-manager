import { z } from 'zod';
import { t } from '@/server/trpc';

export const update = t.procedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      enabled: z.boolean(),
      enable_user_authentication: z.boolean(),
      enable_client_messages: z.boolean(),
      max_connections: z.coerce.number().default(-1),
      max_backend_events_per_sec: z.coerce.number().default(-1),
      max_client_events_per_sec: z.coerce.number().default(-1),
      max_read_req_per_sec: z.coerce.number().default(-1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.application.update({
      AppId: input.id,
      AppName: input.name,
      MaxConnections: input.max_connections,
      max_backend_events_per_sec: input.max_backend_events_per_sec,
      max_client_events_per_sec: input.max_client_events_per_sec,
      max_read_req_per_sec: input.max_read_req_per_sec,
      enabled: input.enabled,
      enable_user_authentication: input.enable_user_authentication,
      enable_client_messages: input.enable_client_messages
    });
  });
