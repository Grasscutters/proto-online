"use client";

/**
 * Resolves the base URL of the API.
 */
export function baseUrl(): string {
    return process.env.NODE_ENV == "development" ?
        `http://localhost:${process.env.PORT ?? 3000}` :
        `${process.env.BASE_URL}`;
}
