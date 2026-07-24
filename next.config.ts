import type { NextConfig } from "next";
import { PAGES } from "./src/lib/pages";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return PAGES.map((page) => ({
      source: `/${page.slug}`,
      destination: `/en/${page.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
