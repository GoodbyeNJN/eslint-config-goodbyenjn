import { imports } from "./configs/imports";
import { javascript } from "./configs/javascript";
import { react } from "./configs/react";
import { typescript } from "./configs/typescript";

import type { Options } from "./types";
import type { OxlintConfig } from "oxlint";

export type { Options, OxlintConfig };

export const withConfig = (options: Options = {}, config: OxlintConfig = {}): OxlintConfig => {
    const javascriptConfig = javascript(options);
    const typescriptConfig = typescript(options);
    const reactConfig = react(options);
    const importsConfig = imports(options);

    return {
        ...config,

        env: {
            browser: true,
            node: true,
            builtin: true, // latest ECMAScript globals
            ...config.env,
        },
        plugins: [
            ...(javascriptConfig.plugins ?? []),
            ...(typescriptConfig.plugins ?? []),
            ...(reactConfig.plugins ?? []),
            ...(importsConfig.plugins ?? []),
            ...(config.plugins ?? []),
        ],
        options: {
            ...(javascriptConfig.options ?? {}),
            ...(typescriptConfig.options ?? {}),
            ...(reactConfig.options ?? {}),
            ...(importsConfig.options ?? {}),
            ...(config.options ?? {}),
        },
        settings: {
            ...(javascriptConfig.settings ?? {}),
            ...(typescriptConfig.settings ?? {}),
            ...(reactConfig.settings ?? {}),
            ...(importsConfig.settings ?? {}),
            ...(config.settings ?? {}),
        },
        rules: {
            ...(javascriptConfig.rules ?? {}),
            ...(typescriptConfig.rules ?? {}),
            ...(reactConfig.rules ?? {}),
            ...(importsConfig.rules ?? {}),
            ...(config.rules ?? {}),
        },
        overrides: [
            ...(javascriptConfig.overrides ?? []),
            ...(typescriptConfig.overrides ?? []),
            ...(reactConfig.overrides ?? []),
            ...(importsConfig.overrides ?? []),
            ...(config.overrides ?? []),
        ],
    };
};
