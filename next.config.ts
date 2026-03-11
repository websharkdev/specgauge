import path from "path";
import type { NextConfig } from "next";

const radixAliases = {
  "@radix-ui/react-dialog": path.resolve(__dirname, "node_modules/@radix-ui/react-dialog/dist/index.js"),
  "@radix-ui/react-hover-card": path.resolve(__dirname, "node_modules/@radix-ui/react-hover-card/dist/index.js"),
  "@radix-ui/react-label": path.resolve(__dirname, "node_modules/@radix-ui/react-label/dist/index.js"),
  "@radix-ui/react-navigation-menu": path.resolve(__dirname, "node_modules/@radix-ui/react-navigation-menu/dist/index.js"),
  "@radix-ui/react-popover": path.resolve(__dirname, "node_modules/@radix-ui/react-popover/dist/index.js"),
  "@radix-ui/react-progress": path.resolve(__dirname, "node_modules/@radix-ui/react-progress/dist/index.js"),
  "@radix-ui/react-slot": path.resolve(__dirname, "node_modules/@radix-ui/react-slot/dist/index.js"),
  "@radix-ui/react-tooltip": path.resolve(__dirname, "node_modules/@radix-ui/react-tooltip/dist/index.js"),
};

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: radixAliases,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      ...radixAliases,
    };

    return config;
  },
};

export default nextConfig;
