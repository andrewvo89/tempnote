import { RawDraftContentState } from 'draft-js';

export interface NoteInterface {
  title: string;
  content: RawDraftContentState;
  expiryMinutes: number;
  viewsLimitEnabled: boolean;
  viewsLimit: number;
  deleteLinkEnabled: boolean;
  passwordEnabled: boolean;
  password: string;
  passwordConfirmation: string;
}

export enum LinkIdFields {
  ACCESS = 'accessLinkId',
  STATUS = 'statusLinkId',
  DELETE = 'deleteLinkId',
}

export enum NoteStatuses {
  VALID = 'VALID',
  INVALID = 'INVALID',
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}
