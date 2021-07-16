import Head from 'next/head';
import PremiumFeaturesGrid from '@page-components/PremiumPage/PremiumFeaturesGrid';
import RegisterInterestForm from '@page-components/PremiumPage/RegisterInterestForm';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Container, Heading } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

/**
 * Premium features page.
 * @return {*}  {JSX.Element}
 */
const PremiumPage = (): JSX.Element => {
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
      justifyContent='center'
      alignItems='stretch'
    >
      <Head>
        <title>Tempnote | Premium</title>
        <meta
          name='description'
          content='Register interest for premium features such as saving links, sharing links, email notifications, extended expiry times, views tracking and premium support'
        />
      </Head>
      <Heading textAlign='center'>Tempnote Premium</Heading>
      <PremiumFeaturesGrid />
      <RegisterInterestForm />
    </Container>
  );
};

export default PremiumPage;
