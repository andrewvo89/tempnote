export interface Form {
  name: string;
  email: string;
  message: string;
}

export interface State {
  loading: boolean;
  success: boolean;
  error: boolean;
}

export enum ActionTypes {
  SEND_MESSAGE_START = 'SEND_MESSAGE_START',
  SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR',
  RESET_SUCCESS = 'RESET_SUCCESS',
  RESET_ERROR = 'RESET_ERROR',
}
