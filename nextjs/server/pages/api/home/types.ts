import { NoteInterface } from '@server/models/note/types';
import { RawDraftContentState } from 'draft-js';

export interface RequestBody extends NoteInterface {
  title: string;
  content: RawDraftContentState;
  expiryMinutes: number;
  viewsLimitEnabled: boolean;
  viewsLimit: number;
  deleteLinkEnabled: boolean;
  passwordEnabled: boolean;
  password: string;
  passwordConfirmation: string;
  captchaToken: string;
}
