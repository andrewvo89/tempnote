export interface Form {
  name: string;
  content: string;
}

export interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface State {
  loading: boolean;
  success: boolean;
  error: boolean;
  debounced: boolean;
}

export enum ActionTypes {
  SEND_USE_CASE_START = 'SEND_USE_CASE_START',
  SEND_USE_CASE_SUCCESS = 'SEND_USE_CASE_SUCCESS',
  SEND_USE_CASE_ERROR = 'SEND_USE_CASE_ERROR',
  RESET_SUCCESS = 'RESET_SUCCESS',
  RESET_ERROR = 'RESET_ERROR',
  SET_DEBOUNCE = 'SET_DEBOUNCE',
  RESET_DEBOUNCED = 'RESET_DEBOUNCE',
  RESET_STATE = 'RESET_STATE',
}
