import Feature from '@components/Feature';
import { Box, SimpleGrid } from '@chakra-ui/react';
import {
  FcTodoList,
  FcFeedback,
  FcShare,
  FcOvertime,
  FcStatistics,
  FcVoicePresentation,
} from 'react-icons/fc';

/**
 * Grid of premium feature components.
 * @return {*}  {JSX.Element}
 */
const PremiumFeaturesGrid = (): JSX.Element => (
  <Box as='section' mx='auto' py='12' px={{ base: '6', md: '8' }}>
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacingX='10'
      spacingY={{ base: '8', md: '14' }}
    >
      <Feature title='Save Links' icon={<FcTodoList />}>
        Access your links from one location and check the status of each note.
      </Feature>
      <Feature title='Share Links' icon={<FcShare />}>
        Share your notes through a variety of platforms such as Facebook,
        Twitter, LinkedIn, Email and much more.
      </Feature>
      <Feature title='Email Notifications' icon={<FcFeedback />}>
        Recieve an email notification when your link expires.
      </Feature>
      <Feature title='Extended Expiry Times' icon={<FcOvertime />}>
        Select custom expiry times beyond 7 days.
      </Feature>
      <Feature title='Track Views' icon={<FcStatistics />}>
        See how many times your notes have been accessed.
      </Feature>
      <Feature title='Premium Support' icon={<FcVoicePresentation />}>
        24/7 email support ready to answer any questions you have.
      </Feature>
    </SimpleGrid>
  </Box>
);

export default PremiumFeaturesGrid;
