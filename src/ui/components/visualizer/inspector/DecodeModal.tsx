import { IoMdClose } from "react-icons/io";

import FileTree from "@components/FileTree.tsx";
import Line from "@components/Line.tsx";
import Modal from "@components/Modal.tsx";
import PasteMessage from "@components/visualizer/inspector/PasteMessage.tsx";
import UploadFile from "@components/visualizer/inspector/UploadFile.tsx";

import classNames from "classnames";

interface IProps {
    show: boolean;
    set: (value: boolean) => void;
}

function DecodeModal(props: IProps) {
    const { show, set } = props;

    return (
        <Modal isOpen={show} className={"relative text-white-100 bg-black-300"}>
            <div className={"w-full flex flex-row justify-between"}>
                <UploadFile />

                <Line thickness={4} />

                <PasteMessage />

                <Line thickness={4} />

                <div className={"Inspector_Column"}>
                    <span className={"Inspector_Label"}>
                        Select an Existing File
                    </span>

                    <span className={"select-none text-transparent"}>
                        Select an Existing File
                    </span>

                    <FileTree
                        data={[
                            {
                                type: "folder",
                                name: "gacha.proto",
                                files: [
                                    {
                                        type: "file",
                                        name: "DoGachaReq"
                                    }
                                ]
                            },
                            {
                                type: "folder",
                                name: "5.1",
                                files: [
                                    {
                                        type: "folder",
                                        name: "gacha.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "DoGachaReq"
                                            }
                                        ]
                                    },
                                    {
                                        type: "folder",
                                        name: "login.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "PlayerLoginReq"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "folder",
                                name: "gacha.proto",
                                files: [
                                    {
                                        type: "file",
                                        name: "DoGachaReq"
                                    }
                                ]
                            },
                            {
                                type: "folder",
                                name: "5.1",
                                files: [
                                    {
                                        type: "folder",
                                        name: "gacha.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "DoGachaReq"
                                            }
                                        ]
                                    },
                                    {
                                        type: "folder",
                                        name: "login.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "PlayerLoginReq"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "folder",
                                name: "gacha.proto",
                                files: [
                                    {
                                        type: "file",
                                        name: "DoGachaReq"
                                    }
                                ]
                            },
                            {
                                type: "folder",
                                name: "5.1",
                                files: [
                                    {
                                        type: "folder",
                                        name: "gacha.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "DoGachaReq"
                                            }
                                        ]
                                    },
                                    {
                                        type: "folder",
                                        name: "login.proto",
                                        files: [
                                            {
                                                type: "file",
                                                name: "PlayerLoginReq"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>

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

export default DecodeModal;
