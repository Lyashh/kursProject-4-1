export interface HomeState {
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
  rhombus: {
    d1: { value: number; err: boolean };
    d2: { value: number; err: boolean };
    [key: string]: { value: number; err: boolean };
  };

  circle: {
    r: { value: number; err: boolean };
    [key: string]: { value: number; err: boolean };
  };

  rhombusArea: number | null;
  triangleArea: number | null;
  circleArea: number | null;

  triangleErrors: {
    side: string;
    sumSides: string;
  };

  areaErr: string;
}

export interface StackQueueState {
  stack: Array<string>;
  queue: Array<string>;
  stackItem: string;
  queueItem: string;
  modalText: string;
  modalShow: boolean;
}

export interface FileTaskState {
  value: string;
  on: boolean;
  result: string;
  timerId: number;
  modalOpen: boolean;
}
