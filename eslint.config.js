// @ts-check
import { withGoodbyeNJNConfig } from "./dist/esm/index.js";

export default [
    {
        ignores: ["modules"],
    },
    ...withGoodbyeNJNConfig(),
];
