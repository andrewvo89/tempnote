import dayjs from 'dayjs';
import ExpiryCard from '@page-components/SuccessPage/ExpiryCard';
import Head from 'next/head';
import LinkCards from '@page-components/SuccessPage/LinkCards';
import React, { useContext, useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import SuccessAlert from '@page-components/SuccessPage/SuccessAlert';
import { AppContext } from 'components/AppProvider/ContextProvider';
import { Button, Collapse, Container, Image, Stack } from '@chakra-ui/react';
import { Props } from '@page-components/SuccessPage/types';
import { useRouter } from 'next/dist/client/router';
dayjs.extend(relativeTime);

/**
 * Page for successful note creation.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const SuccessPage = (props: Props): JSX.Element | null => {
  const { success, setSuccess, setAppLoading, setStickyFooter } =
    useContext(AppContext);
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    setAppLoading(false);
    setStickyFooter(false);
  }, [setAppLoading, setStickyFooter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (success) {
      return;
    }
    push('/');
  }, [success, push]);

  if (!success) {
    return null;
  }

  const {
    accessLinkId,
    deleteLinkEnabled,
    deleteLinkId,
    expiryDate,
    passwordEnabled,
    // statusLinkId,
    viewsLimit,
    viewsLimitEnabled,
  } = success;

  return (
    <Container
      maxW='md'
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
    >
      <Head>
        <title>Tempnote | Success</title>
        <meta name='description' content='Copy your access link' />
      </Head>
      <Stack direction='column' align='stretch' spacing={4}>
        <Image
          src={props.heroImage}
          alt='hero-image'
          w='xs'
          opacity={0.8}
          alignSelf='center'
        />
        <SuccessAlert />
        <ExpiryCard
          currentTime={currentTime}
          expiryDate={expiryDate}
          viewsLimit={viewsLimit}
          viewsLimitEnabled={viewsLimitEnabled}
        />
        <Collapse in={currentTime < expiryDate} animateOpacity>
          <LinkCards
            accessLinkId={accessLinkId}
            deleteLinkEnabled={deleteLinkEnabled}
            deleteLinkId={deleteLinkId}
            passwordEnabled={passwordEnabled}
            // statusLinkId={statusLinkId}
          />
        </Collapse>
        <Button
          alignSelf='flex-end'
          colorScheme='blue'
          rounded='full'
          onClick={() => setSuccess(null)}
        >
          Write another note?
        </Button>
        <Stack direction='row' justify='space-evenly'>
          <Stack spacing={4}></Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SuccessPage;
