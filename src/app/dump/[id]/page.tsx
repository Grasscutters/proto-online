"use server";

import { Metadata } from "next";
import { prisma } from "@backend/db.ts";

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { BASE } from "@backend/filesystem.ts";
import { redirect } from "next/navigation";
import PacketVisualizer from "@components/visualizer/PacketVisualizer.tsx";
import { Packet } from "@backend/types.ts";

interface IProps {
    params: Promise<{ id: string }>;
}

async function Page({ params }: IProps) {
    const { id } = await params;

    // Check if the packet dump exists on the file system.
    const filePath = `${BASE}/${id}.json`;
    if (!existsSync(filePath)) {
        // Send user back to the main page.
        redirect("/");
    }

    // Read the packet data from the file system.
    const data = await readFile(filePath, "utf-8");
    if (!data) {
        // Send user back to the main page.
        redirect("/");
    }

    // Parse the data as JSON.
    const packets = JSON.parse(data) as Packet[];

    return (
        <PacketVisualizer base={packets} id={id} />
    );
}

export default Page;

/**
 * Generates the website metadata from the given parameters.
 *
 * @param params The parameters to generate the metadata from.
 */
export async function generateMetadata({ params }: IProps) {
    // Resolve the dump from the given parameters.
    const dump = await prisma.dump.findFirst({
        where: {
            id: (await params).id
        },
        select: {
            author: true,
            hash: true
        }
    });

    if (!dump) {
        return {
            title: "Unknown Packet Dump",
            description: "Invalid packet dump ID provided."
        } satisfies Metadata;
    }

    // Query the user who created the dump.
    const user = await fetch(`https://discord.com/api/v9/users/${dump.author}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            "Content-Type": "application/json"
        },
        cache: "force-cache"
    });

    if (!user.ok) {
        return {
            title: "Unknown Packet Dump",
            description: "Invalid packet dump ID provided."
        } satisfies Metadata;
    }

    const userData = await user.json();
    return {
        title: `${userData.global_name}'s Packet Dump`,
        description: `Packet dump with hash \`${dump.hash.substring(0, 15)}\`...`,
        openGraph: {
            images: [
                { url: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` }
            ]
        }
    } satisfies Metadata;
}
