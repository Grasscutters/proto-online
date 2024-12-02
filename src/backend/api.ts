"use client";

/**
 * Resolves the base URL of the API.
 */
export function baseUrl(): string {
    return `${process.env.NEXT_PUBLIC_BASE_URL}`;
}
