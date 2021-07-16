import Head from 'next/head';
import Image from 'next/image';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

/**
 * Custom 500 error page.
 * @return {*}  {JSX.Element}
 */
const Custom500Page = (): JSX.Element => {
  const { setAppLoading, setStickyFooter, setIs500 } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    setAppLoading(false);
    setStickyFooter(false);
    setIs500(true);
    return () => setIs500(false);
  }, [setAppLoading, setStickyFooter, setIs500]);

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
        <meta name='description' content='Internal server error' />
      </Head>
      <Flex
        direction={['column', 'row']}
        justify='center'
        align='center'
        gridGap={[2, 4]}
      >
        {/* <Heading size='lg'>404 Error</Heading> */}
        <Image
          src='/images/500/undraw_server_down_s4lk.svg'
          alt='500'
          width={200}
          height={200}
        />
        <Divider orientation='vertical' h={40} display={['none', 'unset']} />
        <Text fontSize='xl'>Internal server error</Text>
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

export default Custom500Page;
