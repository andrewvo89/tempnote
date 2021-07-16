import { ReactNode, Dispatch, SetStateAction } from 'react';
export interface Success {
  accessLinkId: string;
  deleteLinkEnabled: boolean;
  deleteLinkId: string | null;
  expiryDate: number;
  viewsLimit: number | null;
  viewsLimitEnabled: boolean;
  passwordEnabled: boolean;
}

export interface Context {
  success: Success | null;
  setSuccess: Dispatch<SetStateAction<Success | null>>;
  appLoading: boolean;
  setAppLoading: Dispatch<SetStateAction<boolean>>;
  stickyFooter: boolean;
  setStickyFooter: Dispatch<SetStateAction<boolean>>;
  footerHeight: number;
  setFooterHeight: Dispatch<SetStateAction<number>>;
  is404: boolean;
  setIs404: Dispatch<SetStateAction<boolean>>;
  is500: boolean;
  setIs500: Dispatch<SetStateAction<boolean>>;
}

export interface Props {
  children: ReactNode;
}
