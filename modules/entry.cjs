const pluginTypescript = require("@typescript-eslint/eslint-plugin");
const parserTypescript = require("@typescript-eslint/parser");
const configAlloyBase = require("eslint-config-alloy/base");
const configAlloyReact = require("eslint-config-alloy/react");
const configAlloyTypescript = require("eslint-config-alloy/typescript");
const configAlloyVue = require("eslint-config-alloy/vue");
const configGitignore = require("eslint-config-flat-gitignore");
const pluginImport = require("eslint-plugin-import-x");
const pluginReact = require("eslint-plugin-react");
const pluginReactHooks = require("eslint-plugin-react-hooks");
const pluginVue = require("eslint-plugin-vue");
const pluginImportResolverNode = require("eslint-import-resolver-node");
const pluginImportResolverTypescript = require("eslint-import-resolver-typescript");
const globals = require("globals");
const localPkg = require("local-pkg");
const parserVue = require("vue-eslint-parser");

module.exports = {
    pluginTypescript,
    parserTypescript,
    configAlloy: {
        base: configAlloyBase,
        typescript: configAlloyTypescript,
        react: configAlloyReact,
        vue: configAlloyVue,
    },
    configGitignore,
    pluginImport,
    pluginReact,
    pluginReactHooks,
    pluginVue,
    pluginImportResolverNode,
    pluginImportResolverTypescript,
    globals,
    localPkg,
    parserVue,
};
