import { z } from 'zod';
import { t } from '@/server/trpc';

export const remove = t.procedure
  .input(z.string().min(1))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.application.delete(input);
  });
