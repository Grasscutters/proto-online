import { useEffect, useState } from "react";
import { FaClipboard } from "react-icons/fa";

import { useProto } from "@stores/proto.ts";

import classNames from "classnames";
import { parse } from "protobufjs";

function PasteMessage() {
    const { set } = useProto();

    const [text, setText] = useState<string | undefined>(undefined);
    const [hasFile, setHasFile] = useState(false);

    useEffect(() => {
        const listener = async (event: ClipboardEvent) => {
            let text = event.clipboardData?.getData("text");
            if (text == undefined) return;

            setText(text);
        };

        window.addEventListener("paste", listener);

        return () => window.removeEventListener("paste", listener);
    }, []);

    useEffect(() => {
        if (text == undefined) return;

        // Check if the text contains the protobuf header.
        let copy = text;
        if (!text.includes("syntax =")) {
            copy = `syntax = "proto3";\n` + text;
        }

        try {
            // Parse the protobuf message from the clipboard.
            const message = parse(copy).root;

            setHasFile(true);
            set({ parser: message });
        } catch (error) {
            alert("Invalid protobuf message in clipboard paste.");
            console.error("Failed to parse clipboard data:", error);
        }
    }, [text]);

    return (
        <div className={"Inspector_Column"}>
            <span className={"Inspector_Label"}>Paste a Message</span>

            <div className={"flex flex-col items-center gap-4"}>
                <FaClipboard
                    size={96}
                    className={classNames(
                        "hover:cursor-pointer",
                        "transition-all duration-300 ease-in-out",
                        !hasFile ? "opacity-30" : ""
                    )}
                    onClick={async () => {
                        try {
                            setText(await navigator.clipboard.readText());
                        } catch (error) {
                            alert("Unable to read clipboard data.");
                            console.error(
                                "Failed to read clipboard data:",
                                error
                            );
                        }
                    }}
                />

                <span>
                    {!hasFile ? "Waiting for paste..." : "Parsing data..."}
                </span>
            </div>
        </div>
    );
}

export default PasteMessage;
