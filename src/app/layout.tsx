import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import classNames from "classnames";

import "./layout.scss";
import "@css/Text.scss";
import "react-contexify/ReactContexify.css";

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
