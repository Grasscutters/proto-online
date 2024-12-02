/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MODE: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
