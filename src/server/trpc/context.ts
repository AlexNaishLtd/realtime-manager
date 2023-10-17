import type { NextApiResponse } from 'next';
import type { Session } from "next-auth";
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { inferAsyncReturnType } from '@trpc/server';
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

interface CreateContextOptions {
  session: Session | null;
  res: NextApiResponse;
}

const createContextInner = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    res: opts.res,
    db,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
    res
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
