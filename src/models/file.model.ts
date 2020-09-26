import { types, SnapshotIn, Instance } from "mobx-state-tree";
import { formatTextModel } from "./formatText.model";

export const FileModel = types.model("FileModel", {
  name: types.string,
  value: types.maybeNull(types.string),
  saved: types.boolean,
  formatText: types.array(formatTextModel),
});

export type File = Instance<typeof FileModel>;
export type FileDto = SnapshotIn<typeof FileModel>;
