import { createContext, useState } from 'react';
import {
  Context,
  Props,
  Success,
} from '@components/AppProvider/ContextProvider/types';

export const AppContext = createContext({
  success: null,
  appLoading: false,
  stickyFooter: true,
  footerHeight: 0,
  is404: false,
  is500: false,
} as Context);

/**
 * Provides the app with app-wide state context.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const ContextProvider = (props: Props): JSX.Element => {
  const [success, setSuccess] = useState<Success | null>(null);
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [stickyFooter, setStickyFooter] = useState<boolean>(true);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [is404, setIs404] = useState<boolean>(false);
  const [is500, setIs500] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        success: success,
        setSuccess: setSuccess,
        appLoading: appLoading,
        setAppLoading: setAppLoading,
        stickyFooter: stickyFooter,
        setStickyFooter: setStickyFooter,
        footerHeight: footerHeight,
        setFooterHeight: setFooterHeight,
        is404: is404,
        setIs404: setIs404,
        is500: is500,
        setIs500: setIs500,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
