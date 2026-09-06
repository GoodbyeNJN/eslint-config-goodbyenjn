import process from "node:process";

import { $ } from "@goodbyenjn/utils/exec/safe";
import { Err, Result, ResultError } from "@goodbyenjn/utils/result";

import { OxfmtConfigFile, OxlintConfigFile } from "./oxc";
import { PackageManager } from "./pm";
import { TsConfigFile } from "./tsconfig";
import { styleText as s } from "./utils";
import { VSCodeConfigFile } from "./vscode";

const INDENT = "    ";
const DONE = ` ${s.green("DONE")}\n`;
const FAILED = ` ${s.red("FAILED")}\n`;
const PACKAGES = ["@goodbyenjn/configs", "oxlint", "oxfmt", "oxlint-tsgolint", "typescript"];
const SCRIPTS = {
    check: "tsc && oxlint && oxfmt --check",
    "check:type": "tsc",
    lint: "oxlint",
    "lint:fix": "oxlint --fix",
    format: "oxfmt --check",
    "format:write": "oxfmt",
};

const write = (text: string) => {
    process.stdout.write(text);
};
const print = (text: string) => {
    write(text);
    write("\n");
};

export const init = async (dryRun?: boolean, cwd = process.cwd()) => {
    const DRY_RUN = dryRun ? s.dim("[DRY_RUN] ") : "";

    const result = await Result.gen(async function* () {
        const modifiedFiles: string[] = [];

        const pm = new PackageManager(dryRun, cwd);

        let isEsmProject: boolean;
        {
            write("Checking if repository is clean...");
            const { exitCode } = yield* await $`git diff --quiet HEAD`;
            if (exitCode !== 0) {
                yield* Err(
                    new Error(
                        "Repository is not clean, please commit or stash your changes before proceeding.",
                    ),
                );
            }
            write(DONE);

            write("Resolving project type...");
            isEsmProject = yield* await pm.isEsmProject();
            write(DONE);
            print(
                `${INDENT}${s.cyan("type")}${s.dim(":")} ${s.blue(isEsmProject ? "ES Module" : "CommonJS")}`,
            );
        }

        print("");

        {
            write("Fetching latest package versions...");
            const versions = yield* await pm.fetchPackageVersions(PACKAGES);
            write(DONE);
            for (const { name, version } of versions) {
                print(`${INDENT}${s.cyan(name)}${s.dim(":")} ${s.blue(version)}`);
            }

            print("");

            print("Installing packages...");
            yield* await pm.addPackages(versions, true);
            const { command, args, proc } = (yield* await pm.install()) || {};

            print(s.dim("-".repeat(10)));
            if (proc) {
                yield* await proc;
            } else {
                write(`${INDENT}${DRY_RUN}${s.cyan(`${command} ${args.join(" ")}`)}`);
                write(DONE);
            }
            print(s.dim("-".repeat(10)));
        }

        print("");

        {
            print("Writing npm scripts...");
            yield* await pm.addScripts(SCRIPTS);
            for (const [name, command] of Object.entries(SCRIPTS)) {
                write(`${INDENT}${DRY_RUN}${s.cyan(name)}${s.dim(":")} ${s.blue(command)}`);
                write(DONE);
            }
        }

        print("");

        {
            const oxlintConfigFile = new OxlintConfigFile(isEsmProject, dryRun, cwd);

            print("Writing oxlint configuration file...");
            for await (const { filename, result } of oxlintConfigFile.write()) {
                modifiedFiles.push(filename);

                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }

            print("Deleting other oxlint configuration files...");
            for await (const { filename, result } of oxlintConfigFile.deleteOthers()) {
                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }
        }

        print("");

        {
            const oxfmtConfigFile = new OxfmtConfigFile(isEsmProject, dryRun, cwd);

            print("Writing oxfmt configuration file...");
            for await (const { filename, result } of oxfmtConfigFile.write()) {
                modifiedFiles.push(filename);

                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }

            print("Deleting other oxfmt configuration files...");
            for await (const { filename, result } of oxfmtConfigFile.deleteOthers()) {
                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }
        }

        print("");

        {
            const tsConfigFile = new TsConfigFile(dryRun, cwd);

            print("Writing tsconfig.json...");
            for await (const { filename, result } of tsConfigFile.write()) {
                modifiedFiles.push(filename);

                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }
        }

        print("");

        {
            const vscodeConfigFile = new VSCodeConfigFile(dryRun, cwd);

            print("Writing VSCode configuration files...");
            for await (const { filename, result } of vscodeConfigFile.write()) {
                modifiedFiles.push(filename);

                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* result;
                write(DONE);
            }
        }

        print("");

        {
            print("Formatting files...");
            for (const filename of modifiedFiles) {
                write(`${INDENT}${DRY_RUN}${s.cyan(filename)}`);
                yield* await $`oxfmt ${filename}`;
                write(DONE);
            }
        }
    });

    if (result.isErr()) {
        write(FAILED);

        print("");
        print(s.dim("-".repeat(30)));
        print(s.red("Initialization failed"));

        console.log();
        console.log(ResultError.fmt(result));

        process.exit(1);
    } else {
        print("");
        print(s.dim("-".repeat(30)));
        print(s.green("Initialization complete"));

        process.exit(0);
    }
};

await init(process.argv.includes("--dry-run"));
