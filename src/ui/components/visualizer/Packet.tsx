import { CSSProperties } from "react";
import { useContextMenu } from "react-contexify";

import { Packet as PacketType } from "@backend/types.ts";

import classNames from "classnames";

import "@css/Packet.scss";

function SourceTag({ source }: { source: "client" | "server" }) {
    return (
        <div className={"h-full flex justify-center text-center source"}>
            <span className={`Packet_Source ${source}`}>
                {source.toUpperCase()}
            </span>
        </div>
    );
}

interface IProps {
    index: number;
    selected: boolean;

    data: PacketType;
    style: CSSProperties;

    onClick?: () => void;
}

function Packet(props: IProps) {
    const { data, index } = props;

    const { show } = useContextMenu({ id: "visualizer-menu" });

    return data != undefined ? (
        <div
            style={props.style}
            className={classNames(
                {
                    "bg-white-0": !props.selected,
                    "bg-white-7": props.selected,
                    "!bg-dark-blue": props.selected
                },
                "Packet hover:bg-light-blue hover:cursor-pointer"
            )}
            onClick={props.onClick}
            onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();

                show({ event, props: { packet: props.data } });
            }}
        >
            <span className={"time"}>{Math.floor(data.time)}</span>
            <span className={"index"}>{index + 1}</span>
            <SourceTag source={data.source} />
            <span className={"id"} data-type={"number"}>
                {data.packetId}
            </span>
            <span className={"!text-left packet-name"}>{data.packetName}</span>
            <span className={"length"} data-type={"number"}>
                {data.length}
            </span>
            <div className={"flex flex-col !justify-center data w-0"}>
                <span
                    className={
                        "!block !h-fit max-w-[100%] opacity-70 overflow-hidden whitespace-nowrap text-ellipsis"
                    }
                >
                    {data.data}
                </span>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default Packet;
