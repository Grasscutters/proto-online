import { useState } from "react";

import type { Packet } from "@backend/types.ts";

interface PacketHook {
    packets: Packet[];
    push: (packet: Packet) => void;
    clear: () => void;
}

function usePacketList(base: Packet[] | undefined): PacketHook {
    const [packets, setPackets] = useState<Packet[]>(base ?? []);

    const push = (packet: Packet) =>
        setPackets((packets) => {
            packet.index = packets.length;
            return [...packets, packet];
        });

    return {
        packets,
        push,
        clear: () => setPackets([])
    };
}

export default usePacketList;
