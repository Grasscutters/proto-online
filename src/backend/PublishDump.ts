"use server";

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

import { auth } from "@backend/auth.ts";
import { prisma } from "@backend/db.ts";
import { Packet } from "@backend/types.ts";
import { BASE, createBase } from "@backend/filesystem.ts";

const BLACKLISTED = [
    "GetPlayerTokenReq",
    "GetPlayerTokenRsp",
    "PlayerLoginReq",
    "PlayerLoginRsp"
];

/**
 * Publishes the packet array as a dump.
 *
 * @param dataObj The packet array to publish.
 * @constructor
 */
async function PublishDump(
    dataObj: Packet[]
): Promise<[string | undefined, string | undefined]> {
    const session = await auth();
    if (session == undefined) {
        return [undefined, "Failed to authenticate."];
    }

    const user = session.user;
    if (user == undefined || user.id == undefined) {
        return [undefined, "Not authenticated."];
    }

    // Strip sensitive packets from the object.
    let data = dataObj.filter(
        (packet) => !BLACKLISTED.includes(packet.packetName)
    );

    // Hash the data.
    const dataText = JSON.stringify(data);
    const dataHashRaw = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(dataText)
    );
    const dataHash = Array.from(new Uint8Array(dataHashRaw))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    try {
        const dump = await prisma.dump.create({
            data: {
                author: user.id,
                hash: dataHash
            }
        });

        // Save the dump to the file system.
        await saveDump(dump.id as string, dataText);

        return [dump.id, undefined];
    } catch (error) {
        return [undefined, "Dump data is not unique."];
    }
}

/**
 * Writes the dump to the file system.
 *
 * @param id The ID of the dump.
 * @param data The data to write.
 */
async function saveDump(id: string, data: string): Promise<void> {
    const filePath = `${BASE}/${id}.json`;

    // Create the base directory if needed.
    await createBase();

    // Check if the file exists.
    if (existsSync(filePath)) {
        throw new Error("File already exists.");
    }

    await writeFile(filePath, data);
}

export default PublishDump;
