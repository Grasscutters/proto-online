import { useEffect, useState } from "react";

import {
    faFile,
    faFileAlt,
    faWindowClose
} from "@fortawesome/free-regular-svg-icons";

import { MenuButton, MenuSeparator, MenuSpace } from "vanilla-jsoneditor";

import JSONEditor from "@components/JSONEditor.tsx";

import { type Packet } from "@backend/types.ts";

import { useProto } from "@stores/proto.ts";

import { Type, util } from "protobufjs";

import "@css/PacketInspector.scss";

import DecodeModal from "@components/visualizer/inspector/DecodeModal.tsx";

import base64 = util.base64;

const separator = { type: "separator" } satisfies MenuSeparator;
const space = { type: "space" } satisfies MenuSpace;

interface IProps {
    width: number; // As a percentage.

    packet: Packet | undefined;
}

function PacketInspector(props: IProps) {
    const { packet } = props;

    const { set, parser } = useProto();

    const [lastPacket, setLastPacket] = useState<Packet | undefined>(undefined);
    const [showSelect, setShowSelect] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    useEffect(() => {
        if (packet !== lastPacket) {
            setLastPacket(packet);
            set({ parser: undefined });
        }
    }, [packet]);

    useEffect(() => {
        if (parser != undefined) {
            setShowSelect(false);
            setShowSecond(true);
        } else {
            setShowSecond(false);
        }
    }, [parser]);

    if (packet == undefined) {
        return (
            <div
                id={"visualizer-editor"}
                className={"h-screen flex flex-col"}
                style={{ width: `${props.width}%` }}
            />
        );
    }

    let packetData: unknown = JSON.parse(packet.data);
    if (parser) {
        const message = parser?.lookup(packet.packetName);
        if (message && message instanceof Type) {
            const binary = packet.binary;
            if (binary == undefined) {
                set({ parser: undefined });
                console.error("Packet binary data is undefined.");
            } else {
                const buffer = new Uint8Array(base64.length(binary));
                base64.decode(binary, buffer, 0);

                packetData = message.decode(buffer).toJSON();
            }
        } else {
            console.error("Failed to lookup message.");
        }
    }

    return (
        <>
            <div
                id={"visualizer-editor"}
                className={"h-screen flex flex-col"}
                style={{ width: `${props.width}%` }}
            >
                <JSONEditor
                    readOnly={true}
                    style={{ height: `${showSecond ? 50 : 100}%` }}
                    content={{ json: packetData }}
                    onRenderMenu={(items, _context) => {
                        const decodeWith = {
                            type: "button",
                            icon: parser ? faFileAlt : faFile,
                            title: parser ? "Show Original" : "Decode With",
                            onClick: () => {
                                if (parser) {
                                    set({ parser: undefined });
                                    setShowSecond(false);
                                } else {
                                    setShowSelect(true);
                                }
                            }
                        } satisfies MenuButton;

                        return items
                            .slice(0, items.length - 1)
                            .concat([separator, decodeWith, space]);
                    }}
                    className={"w-full"}
                />

                {!showSecond ? undefined : (
                    <JSONEditor
                        readOnly={true}
                        content={{ json: JSON.parse(packet!.data) }}
                        onRenderMenu={(items, _context) => {
                            const close = {
                                type: "button",
                                icon: faWindowClose,
                                title: "Close",
                                onClick: () => setShowSecond(false)
                            } satisfies MenuButton;

                            return items
                                .slice(0, items.length - 1)
                                .concat([space, close]);
                        }}
                        className={"w-full h-1/2"}
                    />
                )}
            </div>

            <DecodeModal show={showSelect} set={setShowSelect} />
        </>
    );
}

export default PacketInspector;
