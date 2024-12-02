/**
 * JSON-serialized packet information.
 */
export type Packet = {
    time: number;
    source: "client" | "server";
    packetId: number;
    packetName: string;
    length: number;
    data: string; // This is a JSON string.

    index?: number; // A client-side index for ordering packets.
    binary?: string; // Base64-encoded raw packet data.
};
