import { t } from '@/server/trpc';
import { getAll } from './procedures/get-all';
import { create } from './procedures/create';
import { fetch } from './procedures/fetch';
import { getChannels } from './procedures/get-channels';
import { update } from './procedures/update';
import { remove } from './procedures/remove';

export const appsRouter = t.router({
  getAll,
  create,
  fetch,
  getChannels,
  update,
  remove
});
