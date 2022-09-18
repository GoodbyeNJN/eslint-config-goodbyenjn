module.exports = {
    extends: [
        "alloy",
        "alloy/react",
        // "alloy/typescript",
        "plugin:react-hooks/recommended",
    ],
    plugins: ["import"],
    rules: {
        // import 强制排序
        "import/order": [
            "warn",
            {
                "newlines-between": "always",
                warnOnUnassignedImports: true,
                pathGroups: [
                    // @/... 开头的视为内部模块
                    {
                        pattern: "@/**",
                        group: "internal",
                    },

                    // 样式文件放在最后，单独一组
                    {
                        pattern: "**/*.+(sa|sc|le|c)ss",
                        group: "index",
                        patternOptions: { matchBase: true },
                        position: "after",
                    },
                ],
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],

        // 优先使用 import type ... from ...
        // "@typescript-eslint/consistent-type-imports": "warn",

        // undef 检查交由 typescript 来处理
        // "no-undef": "off",
    },
};
