const CONFLICT_REGEX = /(syntax|option|import) .*;/;

/**
 * Reads multiple protocol definitions as one large definition.
 *
 * @param files The files to read.
 */
export function readAsProto(files: FileList): Promise<string> {
    let text = "";

    return new Promise<string>((resolve) => {
        const reader = new FileReader();

        function load(index: number) {
            if (index >= files.length) {
                // Process the combined files.
                const lines = text.split("\n");
                const output: string[] = [];

                for (const line of lines) {
                    // Check if the line would have conflicting syntax.
                    if (!CONFLICT_REGEX.test(line)) {
                        output.push(line);
                    }
                }

                resolve(output.join("\n"));
                return;
            }

            reader.onload = (evt) => {
                const contents = evt.target?.result;
                if (!contents) {
                    console.error("Failed to read file.");
                    return;
                }

                if (typeof contents != "string") {
                    console.error("Contents must be a string.");
                    return;
                }

                text += `\n${contents}`;
                load(index + 1);
            };
            reader.readAsText(files[index]);
        }

        // Pass all files to the reader.
        load(0);
    });
}
