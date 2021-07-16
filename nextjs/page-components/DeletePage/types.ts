import { NoteStatuses } from '@models/note/types';

export interface Props {
  status: NoteStatuses;
  title: string;
  content: string;
}
