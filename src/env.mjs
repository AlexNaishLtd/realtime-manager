import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SOKETI_HOST: z.string(),
    SOKETI_PATH: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development")
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SOKETI_HOST: z.string(),
    NEXT_PUBLIC_SOKETI_PATH: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SOKETI_HOST: process.env.SOKETI_HOST,
    SOKETI_PATH: process.env.SOKETI_PATH,
    NEXT_PUBLIC_SOKETI_HOST: process.env.SOKETI_HOST,
    NEXT_PUBLIC_SOKETI_PATH: process.env.SOKETI_PATH
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
