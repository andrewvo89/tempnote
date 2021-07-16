import { ActionTypes } from '@models/note/types';

export const expiryValues: number[] = [
  5, 15, 30, 60, 360, 720, 1440, 4320, 7200, 10080,
];

/**
 * Get the unlock API route depending on the ActionType.
 * @param {ActionTypes} action
 * @return {*}  {string}
 */
export const getUnlockUrl = (action: ActionTypes): string => {
  switch (action) {
    case ActionTypes.ACCESS:
      return '/api/access/unlock';
    case ActionTypes.DELETE:
      return '/api/delete/unlock';
    default:
      return '/api/unlock';
  }
};

/**
 * Get the get API route depending on the ActionType.
 * @param {ActionTypes} action
 * @return {*}  {string}
 */
export const getGetUrl = (action: ActionTypes): string => {
  switch (action) {
    case ActionTypes.ACCESS:
      return '/api/access/get';
    case ActionTypes.DELETE:
      return '/api/delete/get';
    default:
      return '/api/get';
  }
};
