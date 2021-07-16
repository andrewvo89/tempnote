import {
  ActionTypes,
  State,
} from '@page-components/PremiumPage/RegisterInterestForm/types';

export const initialState: State = {
  loading: false,
  error: false,
  success: false,
};

export const reducer = (state: State, action: { type: ActionTypes }): State => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_START:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ActionTypes.REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ActionTypes.REGISTRATION_ERROR:
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
    default:
      return state;
  }
};
