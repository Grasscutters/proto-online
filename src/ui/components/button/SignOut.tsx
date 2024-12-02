import classNames from "classnames";

interface IProps {
    onClick?: () => void;
}

function SignOut(props: IProps) {
    return (
        <div
            className={classNames(
                "flex flex-row bg-red-500",
                "px-3 py-0.5 gap-3 rounded-lg",
                "items-center justify-between",
                "hover:cursor-pointer hover:brightness-90",
                "active:opacity-80 active:scale-95 active:bg-red-600",
                "transition-all duration-200 ease-in-out"
            )}
            onClick={props.onClick}
        >
            <span className={"select-none"}>Sign Out</span>
        </div>
    );
}

export default SignOut;
