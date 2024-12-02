import Elysia from "elysia";

import prismaService from "@backend/db.ts";

const app = new Elysia({ prefix: "/api" }).use(prismaService);

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

/**
 * This is used for Eden Treaty.
 */
export type API = typeof app;
