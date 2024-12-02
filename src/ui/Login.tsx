"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function Login() {
    const { data, status } = useSession();

    useEffect(() => {
        if (status != "loading" && data == undefined) {
            void signIn("discord");
        }

        if (data != undefined) {
            // This assumes this page was opened in a new window.
            window.close();
        }
    }, [data, status]);

    return (
        <div className={"Blank"}>
            {status == "authenticated" ? (
                <span>You may now close the page.</span>
            ) : (
                <span>Redirecting to login...</span>
            )}
        </div>
    );
}

export default Login;
