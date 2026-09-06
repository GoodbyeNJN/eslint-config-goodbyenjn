import { defaults } from "./configs/defaults";
import { imports } from "./configs/imports";
import { jsdoc } from "./configs/jsdoc";
import { jsonc } from "./configs/jsonc";
import { pkg } from "./configs/pkg";
import { tailwind } from "./configs/tailwind";
import { yaml } from "./configs/yaml";

import type { Options } from "./types";
import type { OxfmtConfig } from "oxfmt";

export type { Options, OxfmtConfig };

export const withConfig = (options: Options = {}, config: OxfmtConfig = {}): OxfmtConfig => {
    return {
        ...defaults(options),
        ...config,

        ...imports(options),
        ...jsdoc(options),
        ...pkg(options),
        ...tailwind(options),

        overrides: [
            ...(jsonc(options).overrides ?? []),
            ...(yaml(options).overrides ?? []),
            ...(config.overrides ?? []),
        ],
    };
};
