import { types, Instance } from "mobx-state-tree";
import fileStore from "./fileStore"

const rootStore = types.model("RootStore", {
    fileStore
});

export const createRootStore = rootStore.create({
    fileStore: { file: null}
});

export default rootStore;

export type Root = Instance<typeof rootStore>;
