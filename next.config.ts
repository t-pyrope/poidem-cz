import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Resolve metadata (and notFound) before sending headers for every user agent.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
