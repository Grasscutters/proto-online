import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import classNames from "classnames";

import "./layout.scss";
import "@css/Text.scss";
import "react-contexify/ReactContexify.css";
import { Metadata, Viewport } from "next";

export const metadata = {
    title: "Grasscutter Packet Dumps",
    description: "Visualize and upload JSON-serialized packets."
} satisfies Metadata;

export const viewport = {
    themeColor: "#1969c9"
} satisfies Viewport;

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang={"en"}>
            <body className={classNames(inter.className, "antialiased")}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}

export default Layout;
