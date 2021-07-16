import theme from '@utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Props } from '@components/AppProvider/ThemeProvider/types';

/**
 * Provides app with ChakraProvider.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const ThemeProvider = (props: Props): JSX.Element => (
  <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
);

export default ThemeProvider;
