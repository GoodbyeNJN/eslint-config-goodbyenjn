import type { Options } from "../types";
import type { OxfmtConfig } from "oxfmt";

export const defaults = (options: Options): OxfmtConfig => {
    return {
        // 一行最多 100 字符
        printWidth: 100,
        // 使用 4 个空格缩进
        tabWidth: 4,
        // 不使用缩进符，而使用空格
        useTabs: false,
        // 行尾需要有分号
        semi: true,
        // 使用双引号
        singleQuote: false,
        // 对象的 key 仅在必要时用引号
        quoteProps: "as-needed",
        // jsx 不使用单引号，而使用双引号
        jsxSingleQuote: false,
        // 末尾需要有逗号
        trailingComma: "all",
        // 大括号内的首尾需要空格
        bracketSpacing: true,
        // jsx 标签的反尖括号需要换行
        bracketSameLine: false,
        // 箭头函数，只有一个参数的时候，不需要括号
        arrowParens: "avoid",
        // 使用默认的折行标准
        proseWrap: "preserve",
        // 根据显示样式决定 html 要不要折行
        htmlWhitespaceSensitivity: "css",
        // vue 文件中的 script 和 style 内不用缩进
        vueIndentScriptAndStyle: false,
        // 换行符使用 lf
        endOfLine: "lf",
        // 格式化内嵌代码
        embeddedLanguageFormatting: "auto",
        // 换行时运算符位置，调整到新行开头
        experimentalOperatorPosition: "start",
    };
};
