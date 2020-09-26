import { FormatText } from "./../models/formatText.model";
import { formatTextModel } from "./../models/formatText.model";
import { types, cast, flow } from "mobx-state-tree";
import { FileModel } from "../models/file.model";
import axios from "axios";

const fileStore = types
  .model("FileStore", {
    file: types.maybeNull(FileModel),
    tempData: types.array(formatTextModel),
    serverFiles: types.array(types.string),
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
      const formatedText = formatText(value);

      if (formatedText) {
        self.file = {
          name,
          value,
          saved: true,
          formatText: cast([...formatedText]),
        };
        axios.post("/writeToFile", {
          name,
          text: value,
        });
      }
    };

    const addToLocalData = (value: string) => {
      let id: number = 0;
      let check: boolean = false;

      if (value.length > 5) {
        check = true;
      }

      const item = formatTextModel.create({
        id,
        check,
        value,
      });

      self.tempData.push(item);
      updateIds();
    };

    const updateIds = () => {
      self.tempData.map((el, i) => {
        el.id = ++i;
        return el;
      });
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
          value: devidedString[1].trim(),
          check: devidedString[2].trim() == "true" ? true : false,
        };
        result.push(resultObject);
      });

      return result;
    };

    const getServerFiles = flow(function* () {
      try {
        const res = yield axios.post("/files");
        self.serverFiles = res.data.files;
      } catch (error) {
        throw error;
      }
    });

    return { createFile, addToLocalData, getServerFiles };
  });

export default fileStore;
