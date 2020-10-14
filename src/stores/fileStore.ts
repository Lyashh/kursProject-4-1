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

    const getSeachData = (word: string) => {
      let result: Array<any> = [];

      const arr1 = self
        .file!.formatText.filter((el) => {
          return el.value.toString() == word;
        })
        .map((el) => {
          return {
            id: el.id,
            value: el.value,
            source: "file data",
          };
        });

      const arr2 = self.tempData
        .filter((el) => {
          return el.value.toString() == word;
        })
        .map((el) => {
          return {
            id: el.id,
            value: el.value,
            source: "local data",
          };
        });

      result = [...arr1, ...arr2];

      if (result.length > 10) {
        result = result.slice(0, 10);
      }

      return result;
    };

    return { getFormatedData, getSeachData };
  })
  .actions((self) => {
    const createFile = flow(function* (
      name: string,
      value: string,
      type: string
    ) {
      let formatedText = formatText(value, type);

      if (formatedText) {
        self.file = {
          name,
          value,
          saved: true,
          formatText: cast([...formatedText]),
        };
        yield axios.post("/writeToFile", {
          name,
          text: value,
          dirty: true,
        });
        saveLocalData();
      }
    });

    const addToLocalData = (
      type: string,
      side_a: number,
      side_b: number,
      side_c: number,
      value: number
    ) => {
      let id: number = 0;

      const item = formatTextModel.create({
        id,
        side_a,
        side_b,
        side_c,
        type,
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

    const saveLocalData = () => {
      const arr1 = self.file!.formatText.map((el) => {
        return {
          id: el.id,
          type: el.type,
          side_a: el.side_a,
          side_b: el.side_b,
          side_c: el.side_c,
          value: el.value,
        };
      });

      const arr2 = self.tempData.map((el) => {
        return {
          id: el.id,
          type: el.type,
          side_a: el.side_a,
          side_b: el.side_b,
          side_c: el.side_c,
          value: el.value,
        };
      });

      self.file!.formatText = cast([...arr1, ...arr2]);
      self.file!.formatText.map((el, i) => {
        el.id = ++i;
        return el;
      });
      self.tempData = cast([]);

      const newData = self.file!.formatText.map((el) => {
        return {
          id: el.id,
          type: el.type,
          side_a: el.side_a,
          side_b: el.side_b,
          side_c: el.side_c,
          value: el.value,
        };
      });

      axios.post("/writeToFile", {
        name: self.file!.name,
        text: newData,
        dirty: false,
      });
    };

    const formatText = (text: string, type: string) => {
      if (text == "" || !text) {
        return [];
      }

      const txt = type == "text/plain" ? true : false;

      //Add Validation
      let items = [];
      if (txt) {
        items = text.split("\n");
      } else {
        text = text.replaceAll("↵", "\n");
        items = text.split("\n");
        items.shift();
      }

      let result: Array<FormatText> = [];

      items.forEach((item) => {
        const splitter = type == "text/plain" ? " " : ",";
        const devidedString = item.split(splitter);

        if (devidedString.length === 6 && validateDirtyData(devidedString)) {
          const resultObject: FormatText = {
            id: Number.parseInt(devidedString[0].trim()),
            type: devidedString[1].trim(),
            side_a: Number.parseFloat(devidedString[2].trim()),
            side_b: Number.parseFloat(devidedString[3].trim()),
            side_c: Number.parseFloat(devidedString[4].trim()),
            value: Number.parseFloat(devidedString[5].trim()),
          };
          result.push(resultObject);
        }
      });

      return result;
    };

    const validateDirtyData = (devidedString: Array<any>) => {
      return (
        !Number.isNaN(Number.parseInt(devidedString[0].trim())) &&
        !Number.isNaN(Number.parseFloat(devidedString[2].trim())) &&
        !Number.isNaN(Number.parseFloat(devidedString[3].trim())) &&
        !Number.isNaN(Number.parseFloat(devidedString[4].trim())) &&
        !Number.isNaN(Number.parseFloat(devidedString[5].trim())) &&
        devidedString[0] &&
        devidedString[0].trim()
      );
    };

    const getDataFromServerFile = flow(function* (name: string) {
      try {
        const res = yield axios.get(`/getData/${name}`);
        const { value } = res.data;
        console.log({ value });

        self.file = {
          name,
          value: null,
          saved: true,
          formatText: cast(value),
        };
      } catch (error) {
        throw error;
      }
    });

    const getServerFiles = flow(function* () {
      try {
        const res = yield axios.post("/files");
        self.serverFiles = res.data.files;
      } catch (error) {
        throw error;
      }
    });

    return {
      createFile,
      addToLocalData,
      getServerFiles,
      saveLocalData,
      getDataFromServerFile,
    };
  });

export default fileStore;
