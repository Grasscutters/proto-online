import {
    ComponentPropsWithRef,
    CSSProperties,
    ReactElement,
    ReactNode
} from "react";
import ReactModal from "react-modal";

import classNames from "classnames";

function Overlay(props: ComponentPropsWithRef<any>, contentEl: ReactElement) {
    return (
        <div
            {...props}
            className={"flex z-50 h-full items-center justify-center !bg-dark"}
        >
            {contentEl}
        </div>
    );
}

interface IProps {
    children: undefined | ReactNode | ReactNode[];

    style?: CSSProperties;
    className?: string;

    isOpen: boolean;
}

function Modal(props: IProps) {
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={props.isOpen}
            overlayElement={Overlay}
            style={{
                content: props.style
            }}
            className={{
                base: classNames(
                    { default: "bg-white-100" },
                    props.className,
                    "flex w-1/2 h-1/2 rounded-xl p-4"
                ),
                afterOpen: "",
                beforeClose: ""
            }}
        >
            {props.children}
        </ReactModal>
    );
}

export default Modal;
