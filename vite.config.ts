import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { voidReact } from "@void/react/plugin";
import { defineConfig } from "vite-plus";
import { voidPlugin } from "void";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    voidPlugin(),
    voidReact({ react: { compiler: true } }),
    {
      name: "wellfed-seo-assets",
      apply: "build",
      enforce: "post",
      buildApp: {
        order: "post",
        async handler() {
          const { writeSeoAssets } = await import("./scripts/seo-assets.mjs");
          writeSeoAssets(resolve(root, "dist/client"), root);
        },
      },
    },
  ],
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
