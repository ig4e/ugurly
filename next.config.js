/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "cdn.discordapp.com" },
      { hostname: "pub-227df0c783494ba6bf7b3308de901be8.r2.dev" },
    ],
  },
};

export default config;
