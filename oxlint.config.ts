import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig(
    {},
    {
        ignorePatterns: ["**/__fixtures__", "**/__snapshots__"],
    },
);
