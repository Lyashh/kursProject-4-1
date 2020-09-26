import { types, Instance } from "mobx-state-tree";
import fileStore from "./fileStore";

const rootStore = types
  .model("RootStore", {
    fileStore,
    greeting: types.boolean,
  })
  .actions((self) => {
    const setGreeting = (value: boolean) => {
      self.greeting = value;
    };
    return { setGreeting };
  });

export const createRootStore = rootStore.create({
  fileStore: { file: null, tempData: [], serverFiles: [] },
  greeting: true,
});

export default rootStore;

export type Root = Instance<typeof rootStore>;
