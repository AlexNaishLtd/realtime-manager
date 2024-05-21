/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  basePath: '/rtm',
  env: {
    SOKETI_HOST: `${process.env.SOKETI_HOST}`,
    SOKETI_PATH: `${process.env.SOKETI_PATH}`
  }
};

export default config;
