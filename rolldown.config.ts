import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const dist = "dist";

export default defineConfig({
    input: {
        "cli/index": "src/cli/index.ts",
        "oxlint/index": "src/oxlint/index.ts",
        "oxfmt/index": "src/oxfmt/index.ts",
    },

    output: {
        dir: dist,
        cleanDir: true,
        format: "esm",
        hashCharacters: "hex",
        chunkFileNames: ({ name }) =>
            `shared/[name]${name.startsWith("rolldown-runtime") ? "" : `-[hash]`}.js`,
    },

    platform: "node",

    treeshake: {
        moduleSideEffects: false,
    },

    plugins: [
        dts({
            entry: ["!src/cli/index.ts"],
            tsconfig: "tsconfig.build.json",
        }),
    ],
});
