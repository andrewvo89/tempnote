import ContextProvider from '@components/AppProvider/ContextProvider';
import LayoutProvider from '@components/AppProvider/LayoutProvider';
import LoadingProvider from '@components/AppProvider/LoadingProvider';
import Script from 'next/script';
import ThemeProvider from '@components/AppProvider/ThemeProvider';
import { Props } from '@components/AppProvider/types';

/**
 * Wrapper App component which aggregates all other wrappers
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const AppProvider = (props: Props): JSX.Element => {
  return (
    <ContextProvider>
      <LoadingProvider>
        <ThemeProvider>
          <LayoutProvider>
            <Script
              id='recaptcha'
              src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
            />
            {props.children}
          </LayoutProvider>
        </ThemeProvider>
      </LoadingProvider>
    </ContextProvider>
  );
};

export default AppProvider;
