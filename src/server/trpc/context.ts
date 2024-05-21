import type { NextApiResponse } from 'next';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { inferAsyncReturnType } from '@trpc/server';
import { db } from "@/server/db";

interface CreateContextOptions {
  res: NextApiResponse;
}

const createContextInner = (opts: CreateContextOptions) => {
  return {
    res: opts.res,
    db,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { res } = opts;

  return createContextInner({
    res
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
