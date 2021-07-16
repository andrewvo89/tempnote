import FAQItems from '@page-components/FAQPage/FAQItems';
import Head from 'next/head';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

/**
 * Page for FAQ components.
 * @return {*}  {JSX.Element}
 */
const FAQPage = (): JSX.Element => {
  const { setAppLoading, setStickyFooter } = useContext(AppContext);

  useEffect(() => {
    setAppLoading(false);
    setStickyFooter(false);
  }, [setAppLoading, setStickyFooter]);

  return (
    <Container
      maxW='3xl'
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='stretch'
      gridGap={8}
    >
      <Head>
        <title>Tempnote | FAQ</title>
        <meta name='description' content='Frequently asked questions' />
      </Head>
      <Heading textAlign='center'>Frequently Asked Questions</Heading>
      <VStack spacing='24px' align='stretch'>
        <FAQItems />
      </VStack>
    </Container>
  );
};

export default FAQPage;
