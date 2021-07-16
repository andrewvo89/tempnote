import Footer from '@components/Footer';
import Header from '@components/Header';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Flex, VStack } from '@chakra-ui/react';
import { Fragment, useContext } from 'react';
import { Props } from '@components/AppProvider/LayoutProvider/types';

/**
 * Provides app with layout shell.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const LayoutProvider = (props: Props): JSX.Element => {
  const { stickyFooter, footerHeight, is404, is500 } = useContext(AppContext);

  if (is404 || is500) {
    return <Fragment>{props.children}</Fragment>;
  }

  return (
    <VStack align='center'>
      <Header />
      <Flex pt={14} pb={stickyFooter ? `${footerHeight}px` : 4} w='full'>
        {props.children}
      </Flex>
      <Footer />
    </VStack>
  );
};

export default LayoutProvider;
