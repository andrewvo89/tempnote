import Feature from '@components/Feature';
import { Box, Link, SimpleGrid } from '@chakra-ui/react';
import {
  FcViewDetails,
  FcDeleteDatabase,
  FcAlarmClock,
  FcVideoProjector,
  FcLock,
  FcKey,
  FcMultipleDevices,
  FcVip,
} from 'react-icons/fc';

/**
 * Grid of features.
 * @return {*}  {JSX.Element}
 */
const AboutFeaturesGrid = (): JSX.Element => (
  <Box as='section' mx='auto' px={{ base: '6', md: '8' }}>
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacingX='10'
      spacingY={{ base: '8', md: '14' }}
    >
      <Feature title='Rich Text Editor' icon={<FcViewDetails />}>
        A fully featured rich text editor with text formatting, bulleted lists,
        numbered lists, alignment options, links, inline images and emojis. 😎
      </Feature>
      <Feature title='Automatic Note Deletion' icon={<FcAlarmClock />}>
        Notes are destroyed automatically after a selected expiry time. Options
        available are 5 minutes, 15 minutes, 30 minutes, 1 hour, 6 hours, 12
        hours, 1 day, 3 days, 5 days and 7 days.
      </Feature>
      <Feature title='View Limits' icon={<FcVideoProjector />}>
        Automatically destroy notes after they reach a defined amount of views.
      </Feature>
      <Feature title='Manual Destruction Links' icon={<FcDeleteDatabase />}>
        Generate a manual destruction link to delete a note before its expiry
        time.
      </Feature>
      <Feature title='Password Protection' icon={<FcLock />}>
        Password protect a note to add an additional layer of security and
        privacy.
      </Feature>
      <Feature title='Encryption' icon={<FcKey />}>
        All content is securely encrypted on the server using AES-256 encryption
        and decrypted upon request.
      </Feature>
      <Feature title='Mobile Friendly' icon={<FcMultipleDevices />}>
        Responsive user interface to support all devices sizes from desktops,
        tablets to mobile devices.
      </Feature>
      <Link href='/premium'>
        <Feature title='Premium Features' icon={<FcVip />}>
          Register your interest for more features such as saving links, sharing
          links, email notifications, extended expiry times, tracking views and
          premium technical support.
        </Feature>
      </Link>
    </SimpleGrid>
  </Box>
);

export default AboutFeaturesGrid;
