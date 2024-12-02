import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export const prisma = new PrismaClient();

export type WithPrisma = {
    prisma: typeof prisma;
};

/**
 * For Elysia, we need to create a service that will be used to decorate the client.
 */
const prismaService = new Elysia({ name: "prismaService" }).decorate({
    prisma
});

export default prismaService;
