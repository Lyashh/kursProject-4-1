export interface HomeState {
  greeting: boolean;
  currentTusk: string;
  stack: boolean;
}

export interface NavbarState {
  modalWarningOpen: boolean;
  modalWrongFormat: boolean;
  fileName?: string | null;
  fileValue?: string | null;
}

export interface IndividualState {
  figures: Array<string>;
  figure: string;
  triangle: {
    a: { value: number; err: boolean };
    b: { value: number; err: boolean };
    c: { value: number; err: boolean };
    [key: string]: { value: number; err: boolean };
  };
  triangleArea: number | null;
  triangleErrors: {
    side: string;
    sumSides: string;
  };
  areaErr: string;
}
