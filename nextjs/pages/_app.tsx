import AppProvider from 'components/AppProvider';
import Head from 'next/head';
import '@styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * Default Nextjs App component
 * @param {AppProps} { Component, pageProps }
 * @return {*}  {JSX.Element}
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  if (pageProps?.statusCode === 404 || pageProps?.statusCode === 500) {
    return <Component {...pageProps} />;
  }

  return (
    <AppProvider>
      <Head>
        <title>
          Tempnote | Send secure encrypted notes that self destruct
          automatically after a period of time or after a certain amount of
          views
        </title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='android-chrome-192x192'
          sizes='192x192'
          href='/android-chrome-192x192.png'
        />
        <link
          rel='android-chrome-512x512'
          sizes='512x512'
          href='/android-chrome-512x512.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <meta
          name='description'
          content='Send secure encrypted notes that self destruct
          automatically after a period of time or after a certain amount of
          views'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
}
export default MyApp;
