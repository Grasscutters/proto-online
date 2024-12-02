import { useState } from "react";
import { FaFile } from "react-icons/fa";

import { readAsProto } from "@backend/proto-reader.ts";

import { useProto } from "@stores/proto.ts";

import classNames from "classnames";
import { parse } from "protobufjs";

function UploadFile() {
    const { set } = useProto();

    const [hasFile, setHasFile] = useState(false);

    return (
        <div className={"Inspector_Column"}>
            <span className={"Inspector_Label"}>Upload a File</span>

            <div>
                <div className={"flex flex-col items-center gap-4"}>
                    <FaFile
                        size={96}
                        className={classNames(
                            "hover:cursor-pointer",
                            "transition-all duration-300 ease-in-out",
                            !hasFile ? "opacity-30" : ""
                        )}
                        onClick={() => {
                            const upload = document.createElement("input");
                            upload.type = "file";
                            upload.accept = ".proto";
                            upload.multiple = true;

                            upload.onchange = async () => {
                                const files = upload.files;
                                if (files == null) return;

                                setHasFile(true);

                                let proto = await readAsProto(files);
                                if (!proto.includes("syntax =")) {
                                    proto = `syntax = "proto3";\n` + proto;
                                }

                                try {
                                    // Parse the protobuf message from the clipboard.
                                    const message = parse(proto).root;

                                    set({ parser: message });
                                } catch (error) {
                                    alert(
                                        "Invalid protobuf message in clipboard paste."
                                    );
                                    console.error(
                                        "Failed to parse clipboard data:",
                                        error
                                    );

                                    setHasFile(false);
                                }
                            };

                            upload.click();
                        }}
                    />

                    <span>No file selected</span>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
