"use server";

import { auth } from "@backend/auth.ts";
import { prisma } from "@backend/db.ts";
import { redirect } from "next/navigation";

/**
 * Deletes a dump from the database.
 *
 * @param dumpId The ID of the dump to delete.
 * @param queryOnly Whether to only query the database.
 * @constructor
 * @returns A tuple containing [query success, can delete].
 */
async function DeleteDump(dumpId: string, queryOnly: boolean = false): Promise<[boolean, boolean]> {
    const session = await auth();

    // Validate the session.
    const user = session?.user;
    const id = user?.id;
    if (id == undefined) {
        return [false, false];
    }

    // Look up the dump in the database.
    const dump = await prisma.dump.findFirst({
        where: {
            id: dumpId
        },
        select: {
            author: true
        }
    });

    if (dump == null) {
        // The dump doesn't exist?
        // Redirect the user to the home page.
        redirect("/");
    }

    // Check if the user can delete the dump.
    if (dump!.author != id) {
        return [true, false];
    }

    // If we're only querying the database, return true.
    if (queryOnly) {
        return [true, true];
    }

    // Otherwise, delete the dump.
    await prisma.dump.delete({
        where: {
            id: dumpId
        }
    });

    return [true, true];
}

export default DeleteDump;
