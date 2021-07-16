import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import theme from '@utils/theme';
import { ColorModeScript } from '@chakra-ui/react';
/**
 * Nextjs Document component
 * @export
 * @class Document
 * @extends {NextDocument}
 */
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
