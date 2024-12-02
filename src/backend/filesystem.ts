import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

export const BASE = `${process.cwd()}/${process.env.DUMP_DIRECTORY}`;

/**
 * Creates the base directory.
 */
export async function createBase(): Promise<void> {
    // Make the base directory.
    if (!existsSync(BASE)) {
        await mkdir(BASE, { recursive: true });
    }
}
