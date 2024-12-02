import { create } from "zustand";

import { Root } from "protobufjs";

export interface ProtoStore {
    /**
     * Set the state of the store.
     *
     * @param state The new state to set.
     */
    set: (state: Partial<ProtoStore> | ProtoStore) => void;

    parser: Root | undefined;
}

export const useProto = create<ProtoStore>()(
    (set, _get) =>
        ({
            set,
            parser: undefined
        }) satisfies ProtoStore
);
