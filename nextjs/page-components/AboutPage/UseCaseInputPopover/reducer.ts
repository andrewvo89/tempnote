import {
  ActionTypes,
  State,
} from '@page-components/AboutPage/UseCaseInputPopover/types';

export const initialState: State = {
  loading: false,
  error: false,
  success: false,
  debounced: false,
};

export const reducer = (state: State, action: { type: ActionTypes }): State => {
  switch (action.type) {
    case ActionTypes.SEND_USE_CASE_START:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ActionTypes.SEND_USE_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ActionTypes.SEND_USE_CASE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ActionTypes.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case ActionTypes.RESET_ERROR:
      return {
        ...state,
        error: false,
      };
    case ActionTypes.SET_DEBOUNCE:
      return {
        ...state,
        debounced: true,
      };
    case ActionTypes.RESET_DEBOUNCED:
      return {
        ...state,
        debounced: false,
      };
    case ActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
