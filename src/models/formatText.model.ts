import { types, SnapshotIn, Instance } from "mobx-state-tree";

export const formatTextModel = types.model("FormatTextModel", {
  id: types.number,
  value: types.string,
  check: types.boolean,
});

export type FormatText = Instance<typeof formatTextModel>;
export type FormatTextDto = SnapshotIn<typeof formatTextModel>;
