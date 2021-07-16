import Note from '@models/note';

export interface Props {
  showModal: boolean;
  confirmHandler: () => Promise<void>;
  cancelHandler: () => void;
}
