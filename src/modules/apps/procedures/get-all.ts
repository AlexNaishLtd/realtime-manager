import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { t } from '@/server/trpc';

const defaultAppsSelect = Prisma.validator<Prisma.AppsSelect>()({
  id: true,
  name: true,
  key: true,
  secret: true,
  enabled: true
});

export const getAll = t.procedure
  .input(
    z.object({
      limit: z.number().min(1).max(101).nullish(),
      cursor: z.string().nullish(),
      filter: z.string().optional()
    })
  )
  .query(async ({ ctx, input }) => {
    const limit = input.limit ?? 50;
    const { cursor } = input;
    const items = await ctx.db.apps.findMany({
      select: defaultAppsSelect,
      where: {
        OR: [
          {
            name: {
              contains: (input?.filter || '') as string,
              mode: 'insensitive'
            }
          },
          {
            key: {
              contains: (input?.filter || '') as string,
              mode: 'insensitive'
            }
          }
        ]
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = items.length > limit ? items.pop()?.id : undefined;
    return {
      items: items,
      nextCursor
    };
  });
