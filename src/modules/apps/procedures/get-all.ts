import { z } from 'zod';
import { t } from '@/server/trpc';

export const getAll = t.procedure
  .input(
    z.object({
      limit: z.number().min(1).max(101).nullish(),
    })
  )
  .query(async ({ ctx, input }) => {
    // const items = await ctx.db.application.scan().limit(input.limit || 20).exec();
    const items = await ctx.db.application.scan().attributes(["AppId", "AppName", "AppKey", "AppSecret", "Enabled"]).exec();
    return items;
  });
