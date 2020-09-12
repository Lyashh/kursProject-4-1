import { types } from "mobx-state-tree";

const file = types.model("File", {
  name: types.string,
  value: types.string,
  saved: types.boolean
});

export default file;