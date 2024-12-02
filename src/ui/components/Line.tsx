interface IProps {
    color?: string;
    thickness?: number;
}

function Line({ color, thickness }: IProps) {
    return (
        <div
            style={{
                width: `${thickness ?? 2}px`,
                backgroundColor: color ?? "white",
                height: "100%"
            }}
            className={"rounded-xl"}
        />
    );
}

export default Line;
