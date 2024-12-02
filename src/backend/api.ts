"use client";

/**
 * Resolves the base URL of the API.
 */
export function baseUrl(): string {
    return typeof window === "undefined"
        ? `http://localhost:${process.env.PORT ?? 3000}`
        : window.location.origin;
}
