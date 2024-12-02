import { useState } from "react";
import { FaFile, FaFolder, FaRegFile, FaRegFolderOpen } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

import "@css/FileTree.scss";

export type Data = Folder | File;

type Base = {
    name: string;
};

export type Folder = Base & {
    type: "folder";
    files: Data[];
};

export type File = Base & {
    type: "file";
};

interface IProps {
    data: Data[];
}

function Folder({ name, files }: { name: string; files: Data[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={"flex flex-col"}>
            <div className={"Label"} onClick={() => setOpen(!open)}>
                {name.endsWith(".proto") ? (
                    open ? (
                        <FaRegFile />
                    ) : (
                        <FaFile />
                    )
                ) : open ? (
                    <FaRegFolderOpen />
                ) : (
                    <FaFolder />
                )}
                <span>{name}</span>
            </div>

            {open && (
                <div className={"flex flex-col ml-2"}>
                    {files.map((file, index) => {
                        return file.type == "file" ? (
                            <File key={index} name={file.name} />
                        ) : (
                            <Folder
                                key={index}
                                name={file.name}
                                files={file.files}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function File({ name }: { name: string }) {
    return (
        <div className={"Label hover:cursor-pointer"}>
            <MdMessage />
            <span>{name}</span>
        </div>
    );
}

function FileTree(props: IProps) {
    return (
        <div
            className={"FileTree w-[90%] flex flex-col overflow-y-scroll gap-1"}
        >
            {props.data.map((file, index) => {
                return file.type == "file" ? (
                    <File key={index} name={file.name} />
                ) : (
                    <Folder key={index} name={file.name} files={file.files} />
                );
            })}
        </div>
    );
}

export default FileTree;
