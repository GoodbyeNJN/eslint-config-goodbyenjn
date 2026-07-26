import { withConfig } from "@goodbyenjn/configs/oxfmt";

export default withConfig(
    {},
    {
        ignorePatterns: ["**/__fixtures__", "**/__snapshots__"],
    },
);
