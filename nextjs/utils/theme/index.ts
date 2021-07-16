import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  // useSystemColorMode: true,
};

/**
 * Creates a theme object with a configuration.
 * @param  {} {config}
 */
const theme = extendTheme({ config });
export default theme;
