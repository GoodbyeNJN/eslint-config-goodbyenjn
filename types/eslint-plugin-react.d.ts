declare module "eslint-plugin-react" {
    import type { ESLint } from "eslint";

    declare const plugin: ESLint.Plugin;

    export = plugin;
}