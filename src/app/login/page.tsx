import { Metadata } from "next";

import Login from "@ui/Login.tsx";

export const metadata = {
    title: "Log in to Packet Visualizer",
    description: "Logging in allows you to publish packet dumps."
} satisfies Metadata;

function Page() {
    return <Login />;
}

export default Page;
