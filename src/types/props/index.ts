import { Root } from "../../stores/rootStore";

export interface NavbarProps {
  store?: Root;
}

export interface FilesTaskProps {
  store?: Root;
}

export interface HomeProps {
  store?: Root;
}

export interface IndividualTaskProps {
  active: boolean;
  updateTimer: any;
  sendResult: any;
}
