import { t } from '@/server/trpc';
import { broadcast } from './procedures/broadcast';

export const channelsRouter = t.router({
  broadcast
});
