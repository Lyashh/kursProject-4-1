import { types } from "mobx-state-tree";
import file from "../models/file.model"

const fileStore = types
	.model("FileStore", {
		file: types.maybeNull(file),
	})
	.actions((self) => {
    const createFile = (name:string, value: string) => {
			self.file = {
				name,
				value,
				saved: true
			}
		}
    return { createFile };
  })

export default fileStore;