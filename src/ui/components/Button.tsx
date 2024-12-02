import { ReactNode as Element, MouseEvent } from "react";

import classNames from "classnames";

interface IProps {
    id?: string;
    className?: string;

    onClick?: (event: MouseEvent) => void;

    tooltip?: string;
    children?: string | Element | Element[] | undefined;
}

function Button(props: IProps) {
    return (
        <button
            id={props.id}
            title={props.tooltip}
            onClick={props.onClick}
            className={classNames(
                "w-14 h-14 flex items-center justify-center",
                props.className
            )}
        >
            {props.children}
        </button>
    );
}

export default Button;
