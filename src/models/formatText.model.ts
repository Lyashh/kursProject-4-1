import { types, SnapshotIn, Instance } from "mobx-state-tree";

export const formatTextModel = types.model("FormatTextModel", {
  id: types.number,
  type: types.string,
  side_a: types.number,
  side_b: types.number,
  side_c: types.number,
  value: types.number,
});

export type FormatText = Instance<typeof formatTextModel>;
export type FormatTextDto = SnapshotIn<typeof formatTextModel>;
