import path from "node:path";

import { $ } from "@goodbyenjn/utils/exec";
import { test } from "vitest";

const cases = [
    {
        name: "lint js",
        input: ["js"],
        snapshot: "js.json",
        config: "lint-js.config.js",
    },
    {
        name: "lint ts",
        input: ["ts"],
        snapshot: "ts.json",
        config: "lint-ts.config.js",
    },
    {
        name: "lint react",
        input: ["react"],
        snapshot: "react.json",
        config: "lint-react.config.js",
    },
    {
        name: "lint ts+js",
        input: ["ts", "js"],
        snapshot: "ts+js.json",
        config: "lint-ts+js.config.js",
    },
    {
        name: "lint override",
        input: ["js"],
        snapshot: "override.json",
        config: "lint-override.config.js",
    },
];

const cwd = path.resolve(import.meta.dirname);

const oxlint = (config: string, files: string[]) =>
    $(
        "oxlint",
        [
            "--config",
            config,
            "--format",
            "json",
            ...files.map(file => path.join("__fixtures__", file)),
        ],
        { spawnOptions: { cwd } },
    );

const format = (output: string) => {
    const { diagnostics } = JSON.parse(output);
    const formatted = (diagnostics as { message: string; code: string; filename: string }[])
        .map(({ message, code, filename }) => ({ filename, code, message }))
        .toSorted((a, b) => a.filename.localeCompare(b.filename) || a.code.localeCompare(b.code));

    return JSON.stringify(formatted, null, 2);
};

test.for(cases)("$name", async ({ input, snapshot, config }, { expect }) => {
    const { stdout } = await oxlint(config, input);

    await expect(format(stdout)).toMatchFileSnapshot(path.join(cwd, "__snapshots__", snapshot));
});
