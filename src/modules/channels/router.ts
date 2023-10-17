import { t } from '@/server/trpc';
import { broadcast } from './procedures/broadcast';
import { fetch } from './procedures/fetch';

export const channelsRouter = t.router({
  broadcast,
  fetch
});
