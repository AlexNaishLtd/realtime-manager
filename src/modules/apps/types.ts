import type { ItemFromArray } from "@/config/types";
import type { RouterOutputs } from "@/utils/api";

export type App = ItemFromArray<RouterOutputs['apps']['getAll']>;
export type Channel = ItemFromArray<RouterOutputs['apps']['getChannels']>;