import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Note: the scaffold enabled `cacheComponents` + `partialPrefetching`.
 * They are intentionally disabled here: every page is statically generated
 * per locale via `generateStaticParams` + `setRequestLocale` (next-intl's
 * recommended static-rendering path), which keeps the setup simple and robust.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
