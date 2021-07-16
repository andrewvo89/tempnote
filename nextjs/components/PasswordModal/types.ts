export interface Props {
  showModal: boolean;
  submitHandler: (values: { password: string }) => Promise<void>;
}
