import { FormatText } from "./../models/formatText.model";
import {
  types,
  cast,
  IMSTArray,
  IModelType,
  ISimpleType,
  IAnyType,
} from "mobx-state-tree";
import { FileModel } from "../models/file.model";

const fileStore = types
  .model("FileStore", {
    file: types.maybeNull(FileModel),
  })
  .views((self) => {
    const getFormatedData = () => {
      if (self.file) {
        return self.file.formatText;
      }
      return [];
    };
    return { getFormatedData };
  })
  .actions((self) => {
    const createFile = (name: string, value: string) => {
      console.log({ value });

      const formatedText = formatText(value);
      console.log({ formatedText });

      if (formatedText) {
        self.file = {
          name,
          value,
          saved: true,
          formatText: cast([...formatedText]),
        };
      }
    };

    const formatText = (text: string) => {
      if (text == "" || !text) {
        return [];
      }

      //Add Validation

      const items = text.split("\n");
      let result: Array<FormatText> = [];
      items.forEach((item) => {
        const devidedString = item.split(" ");
        const resultObject: FormatText = {
          id: Number.parseInt(devidedString[0].trim()),
          value: Number.parseInt(devidedString[1].trim()),
          check: devidedString[2].trim() == "true" ? true : false,
        };
        result.push(resultObject);
      });

      return result;
    };

    return { createFile };
  });

export default fileStore;
