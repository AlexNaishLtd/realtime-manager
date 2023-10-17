import { ItemFromArray } from "@/config/types";
import { RouterOutputs } from "@/utils/api";

export type App = ItemFromArray<RouterOutputs['apps']['getAll']['items']>;
export type Channel = ItemFromArray<RouterOutputs['apps']['getChannels']>;