import Head from 'next/head';
import Image from 'next/image';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

/**
 * Custom 404 error page.
 * @return {*}  {JSX.Element}
 */
const Custom404Page = (): JSX.Element => {
  const { setAppLoading, setStickyFooter, setIs404 } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    setAppLoading(false);
    setStickyFooter(false);
    setIs404(true);
    return () => setIs404(false);
  }, [setAppLoading, setStickyFooter, setIs404]);

  /**
   * Handle home button press.
   * @return {*}  {void}
   */
  const homeButtonPressHandler = (): void => {
    router.push('/');
  };

  return (
    <Flex
      justify='center'
      align='center'
      direction='column'
      gridGap={[2, 4]}
      position='fixed'
      left='0px'
      top='0px'
      width='100vw'
      height='100vh'
    >
      <Head>
        <title>Tempnote | 404</title>
        <meta name='description' content='The page could not be found' />
      </Head>
      <Flex
        direction={['column', 'row']}
        justify='center'
        align='center'
        gridGap={[2, 4]}
      >
        {/* <Heading size='lg'>404 Error</Heading> */}
        <Image
          src='/images/404/undraw_page_not_found_su7k.svg'
          alt='404'
          width={200}
          height={200}
        />
        <Divider orientation='vertical' h={40} display={['none', 'unset']} />
        <Text fontSize='xl'>The page could not be found</Text>
      </Flex>
      <Button
        rounded='full'
        colorScheme='blue'
        onClick={homeButtonPressHandler}
      >
        Go back home
      </Button>
    </Flex>
  );
};

export default Custom404Page;
