import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth } = NextAuth({
    providers: [Discord],
    callbacks: {
        async jwt({ token, profile }) {
            if (profile) {
                // Set ID override.
                // This is because the Discord provider doesn't set the ID properly?
                token.id = profile.id;
            }

            return token;
        },

        async session({ session, token }) {
            session.userId = token.id as string;
            session.user.id = token.id as string;

            return session;
        }
    }
});

/**
 * Creates a pop-up window.
 *
 * @param url The URL to open in the pop-up window.
 * @param title The title of the pop-up window
 */
export function popupWindow(url: string, title: string) {
    // Taken from https://github.com/arye321/nextauth-google-popup-login/blob/main/pages/index.js

    const winLeft = window.screenLeft ?? window.screenX;
    const winTop = window.screenTop ?? window.screenY;

    const width =
        window.innerWidth ??
        document.documentElement.clientWidth ??
        screen.width;

    const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + winLeft;
    const top = (height - 550) / 2 / systemZoom + winTop;

    const newWindow = window.open(
        url,
        title,
        `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    );

    newWindow?.focus();
}
