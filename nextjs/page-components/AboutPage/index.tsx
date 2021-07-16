import AboutFeaturesGrid from '@page-components/AboutPage/AboutFeaturesGrid';
import ContactForm from '@page-components/AboutPage/ContactForm';
import Head from 'next/head';
import UseCaseInputPopover from '@page-components/AboutPage/UseCaseInputPopover';
import UseCasesGrid from '@page-components/AboutPage/UseCasesGrid';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Container, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

/**
 * About Page component.
 * @return {*}  {JSX.Element}
 */
const AboutPage = (): JSX.Element => {
  const { setAppLoading, setStickyFooter } = useContext(AppContext);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

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
        <title>Tempnote | About</title>
        <meta
          name='description'
          content='What is Tempnote, features, use cases and contact us'
        />
      </Head>
      <Heading textAlign='center'>About Tempnote</Heading>
      <VStack spacing={8} align='stretch'>
        <VStack spacing={4} align='flex-start'>
          <Heading id='what-is-it' size='md'>
            What Is It?
          </Heading>
          <Text>
            {'Tempnote is a free '}
            <Link
              color='blue.400'
              href='https://github.com/andrewvo89/tempnote'
              target='_blank noopener noreferrer'
            >
              open source
            </Link>
            {
              ' online service that allows users to send secure and confidential information over the internet. The information automatically self destructs after a defined expiry time. On many platforms provided by big tech, your data can be stored on their servers indefinitely with your data being shared with third party providers. We make it a priority to keep your data safe and secure from prying eyes.'
            }
          </Text>
        </VStack>
        <VStack spacing={4} align='flex-start'>
          <Heading id='features' size='md'>
            Features
          </Heading>
          <AboutFeaturesGrid />
        </VStack>
        <VStack spacing={4} align='flex-start'>
          <Heading id='use-cases' size='md'>
            Use Cases
          </Heading>
          <UseCasesGrid />
          <Text>
            {
              'We would love to hear about your favourite use cases on how you use Tempnote. '
            }
            <UseCaseInputPopover open={popoverOpen} setOpen={setPopoverOpen}>
              <Link color='blue.400' onClick={() => setPopoverOpen(true)}>
                Click here to post your contribute your use case.
              </Link>
            </UseCaseInputPopover>
          </Text>
        </VStack>
        <VStack spacing={4} align='flex-start'>
          <Heading id='contact' size='md'>
            Contact Us
          </Heading>
          <ContactForm />
        </VStack>
      </VStack>
    </Container>
  );
};

export default AboutPage;
