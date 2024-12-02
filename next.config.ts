import { NextConfig } from "next";

export default {
    /* Refer to https://github.com/vercel/next.js/blob/canary/packages/next/src/server/config-shared.ts */
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    }
} satisfies NextConfig;
