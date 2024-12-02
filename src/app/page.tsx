import { Metadata } from "next";

import PacketVisualizer from "@components/visualizer/PacketVisualizer.tsx";

export const metadata = {
    title: "Packet Visualizer",
    description: "Visualize JSON-serialized packets."
} satisfies Metadata;

function Page() {
    return <PacketVisualizer />;
}

export default Page;
