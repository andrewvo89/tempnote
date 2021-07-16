export interface State {
  loading: boolean;
  success: boolean;
  error: boolean;
}

export enum ActionTypes {
  REGISTRATION_START = 'REGISTRATION_START',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_ERROR = 'REGISTRATION_ERROR',
  RESET_SUCCESS = 'RESET_SUCCESS',
  RESET_ERROR = 'RESET_ERROR',
}
