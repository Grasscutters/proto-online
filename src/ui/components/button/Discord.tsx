import { FaDiscord } from "react-icons/fa";

import classNames from "classnames";

interface IProps {
    onClick?: () => void;
}

function Discord(props: IProps) {
    return (
        <div
            className={classNames(
                "flex flex-row bg-blurple",
                "px-3 py-1 gap-3 rounded-lg",
                "items-center justify-between",
                "hover:cursor-pointer hover:brightness-90",
                "active:opacity-80 active:scale-95",
                "transition-all duration-200 ease-in-out"
            )}
            onClick={props.onClick}
        >
            <FaDiscord size={28} />

            <span className={"select-none"}>Continue with Discord</span>
        </div>
    );
}

export default Discord;
