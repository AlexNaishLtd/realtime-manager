import { t } from '.';
import { appsRouter } from '@/modules/apps/router';
import { channelsRouter } from '@/modules/channels/router';

export const appRouter = t.router({
  apps: appsRouter,
  channels: channelsRouter
});

export type AppRouter = typeof appRouter;