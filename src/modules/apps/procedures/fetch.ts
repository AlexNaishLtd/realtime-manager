import { z } from 'zod';
import { t } from '@/server/trpc';

export const fetch = t.procedure
  .input(z.string().min(1))
  .query(async ({ ctx, input }) => {
    return ctx.db.application.get(input);
  });
