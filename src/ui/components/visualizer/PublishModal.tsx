import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Discord from "@components/button/Discord.tsx";
import SignOut from "@components/button/SignOut.tsx";
import { Checkbox } from "@components/Checkbox.tsx";
import Modal from "@components/Modal.tsx";

import { popupWindow } from "@backend/auth.ts";
import PublishDump from "@backend/PublishDump.ts";

import classNames from "classnames";

import "@css/PublishModal.scss";

import { baseUrl } from "@backend/api.ts";
import { Packet } from "@backend/types.ts";
import DeleteDump from "@backend/DeleteDump.ts";

interface IProps {
    packets: Packet[];
    id: string | undefined;

    show: boolean;
    set: (show: boolean) => void;
}

function PublishModal({ packets, show, set, id: baseId }: IProps) {
    const session = useSession();
    const router = useRouter();

    const [id, setId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const [waiting, setWaiting] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        if (!show) {
            setId(undefined);
            setWaiting(false);
            setAccepted(false);
        }
    }, [show]);

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(undefined), 5000);
        }
    }, [error]);

    useEffect(() => {
        if (baseId == undefined) return;

        (async () => {
            const [success, canDelete] = await DeleteDump(baseId, true);
            if (!success) {
                setError("Failed to query the database.");
            } else {
                setCanDelete(canDelete);
            }
        })();
    }, [baseId, session]);

    return (
        <Modal
            isOpen={show}
            className={classNames(
                "relative text-white-100 bg-black-300",
                "flex-col items-center justify-center"
            )}
        >
            {id == undefined ? (
                session.status == "authenticated" ? (
                    <>
                        {/* When the user is logged in... */}
                        <span>
                            You are signed in as{" "}
                            <span className={"font-bold"}>
                                {session.data.user?.name}
                            </span>
                        </span>

                        <div className={"mb-1"} />

                        <div className={"flex flex-row gap-2 items-center"}>
                            <span>Not you?</span>

                            <SignOut
                                onClick={async () => {
                                    const data = await signOut({
                                        redirect: false
                                    });
                                    router.push(data.url);
                                }}
                            />
                        </div>

                        <div className={"mb-12"} />

                        { baseId == undefined ? <>
                            <button
                                className={classNames(
                                    "Button bg-green-500",
                                    "disabled:brightness-75 disabled:hover:cursor-not-allowed"
                                )}
                                disabled={!accepted && !waiting}
                                onClick={async () => {
                                    setWaiting(true);

                                    const [id, error] = await PublishDump(packets);
                                    if (error) {
                                        setError(error);
                                        setWaiting(false);
                                    } else {
                                        setId(id);
                                        setWaiting(false);
                                    }
                                }}
                            >
                                Publish to Everyone
                            </button>

                            <div className={"mb-2"} />

                            <div className={"flex flex-row items-center gap-2"}>
                                <Checkbox
                                    id={"terms"}
                                    checked={accepted}
                                    onCheckedChange={(value) =>
                                        setAccepted(
                                            value == "indeterminate" ? false : value
                                        )
                                    }
                                />
                                <label htmlFor={"terms"}>
                                    Accept the{" "}
                                    <a
                                        href={process.env.NEXT_PUBLIC_TOS_URL}
                                        target={"_blank"}
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </> : <>
                            <button
                                className={classNames(
                                    "Button bg-red-500",
                                    "disabled:brightness-75 disabled:hover:cursor-not-allowed"
                                )}
                                disabled={!canDelete}
                                onClick={async () => {
                                    const [success, _canDelete] = await DeleteDump(baseId);
                                    if (!success) {
                                        setError("Failed to delete the dump.");
                                    } else {
                                        alert("Dump deleted successfully!");
                                        redirect("/");
                                    }
                                }}
                            >
                                Delete Dump
                            </button>
                        </> }

                        {error != undefined && (
                            <>
                                <div className={"mb-2"} />

                                <span className={"text-red-500"}>{error}</span>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* When the user is not logged in... */}
                        <h1 className={"font-bold"}>Sign In</h1>

                        <div className={"mb-4"} />

                        <Discord
                            onClick={() =>
                                popupWindow("/login", "Log in with Discord")
                            }
                        />
                    </>
                )
            ) : (
                <>
                    <div className={"flex flex-col gap-1 items-center"}>
                        <span>Your packet dump was published as</span>
                        <span className={"font-bold"}>{id}</span>
                    </div>

                    <div className={"mb-3"} />

                    <div className={"flex flex-row gap-3"}>
                        <button
                            className={"Button bg-blue-500"}
                            onClick={() => router.push(`/dump/${id}`)}
                        >
                            Visit Dump
                        </button>

                        <button
                            className={"Button bg-green-400"}
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(
                                        `${baseUrl()}/dump/${id}`
                                    );
                                    alert("Link copied to clipboard.");

                                    set(false);
                                } catch (error) {
                                    alert("Failed to copy link to clipboard.");
                                    console.error(
                                        "Failed to copy link to clipboard.",
                                        error
                                    );
                                }
                            }}
                        >
                            Share
                        </button>

                        <button
                            className={"Button bg-red-500"}
                            onClick={() => set(false)}
                        >
                            Close
                        </button>
                    </div>
                </>
            )}

            <div
                className={classNames(
                    "absolute right-2 top-2",
                    "hover:cursor-pointer"
                )}
                onClick={() => set(false)}
            >
                <IoMdClose />
            </div>
        </Modal>
    );
}

export default PublishModal;
