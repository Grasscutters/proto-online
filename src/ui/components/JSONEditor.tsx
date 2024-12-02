import { CSSProperties, useEffect, useRef } from "react";

import {
    createJSONEditor,
    JsonEditor as Editor,
    JSONEditorPropsOptional,
    OnRenderMenu
} from "vanilla-jsoneditor";

import "vanilla-jsoneditor/themes/jse-theme-dark.css";

type IProps = JSONEditorPropsOptional & {
    id?: string;
    className?: string;
    style?: CSSProperties;

    onRenderMenu?: OnRenderMenu;
};

/**
 * React component wrapper of 'vanilla-jsoneditor'.
 */
function JSONEditor(props: IProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<Editor | null>(null);

    useEffect(() => {
        editorRef.current = createJSONEditor({
            target: containerRef.current!,
            props: {
                onRenderMenu: props.onRenderMenu
            }
        });

        return () => {
            // Destroy the editor when unmounted.
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, []);

    useEffect(() => {
        editorRef.current?.updateProps(props);
    }, [props]);

    return (
        <div
            id={props.id}
            style={props.style}
            className={`jse-theme-dark ${props.className ?? ""}`}
            ref={containerRef}
        />
    );
}

export default JSONEditor;
