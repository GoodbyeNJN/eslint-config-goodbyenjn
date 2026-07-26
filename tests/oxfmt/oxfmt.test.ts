import path from "node:path";

import { $ } from "@goodbyenjn/utils/exec";
import { test } from "vitest";

const cases = [
    {
        name: "format js",
        input: "js/no-unused-vars.js",
        snapshot: "formatted.js",
        config: "format-js.config.js",
    },
    {
        name: "format ts",
        input: "ts/no-unused-vars.ts",
        snapshot: "formatted.ts",
        config: "format-ts.config.js",
    },
    {
        name: "format react",
        input: "react/no-string-refs.jsx",
        snapshot: "formatted.jsx",
        config: "format-react.config.js",
    },
    {
        name: "format jsonc",
        input: "json/no-trailing-comma.jsonc",
        snapshot: "formatted.jsonc",
        config: "format-jsonc.config.js",
    },
    {
        name: "format yaml",
        input: "yaml/indent-4-space.yaml",
        snapshot: "formatted.yaml",
        config: "format-yaml.config.js",
    },
];

const cwd = path.resolve(import.meta.dirname);

const oxfmt = (config: string, file: string) =>
    $("cat", [path.join("__fixtures__", file)], {
        spawnOptions: { cwd },
    }).pipe("oxfmt", ["--config", config, "--stdin-filepath", file], {
        spawnOptions: { cwd },
    });

test.for(cases)("$name", async ({ input, snapshot, config }, { expect }) => {
    const { stdout } = await oxfmt(config, input);

    await expect(stdout).toMatchFileSnapshot(path.join(cwd, "__snapshots__", snapshot));
});
