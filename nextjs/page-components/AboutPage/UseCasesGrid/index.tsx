import UseCaseCard from '@page-components/AboutPage/UseCasesGrid/UseCaseCard';
import { Box, SimpleGrid } from '@chakra-ui/react';

/**
 * Collection of use case card components.
 * @return {*}  {JSX.Element}
 */
const UseCasesGrid = (): JSX.Element => (
  <Box as='section'>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={4} spacingY={4}>
      <UseCaseCard
        name='Joseph'
        title='Temporary Note to Self'
        body="Joseph creates many self reminders but forgets to clean them up in his favourite note taking app. Joseph uses Tempnote to create notes that expire in 3 days so he doesn't have to worry about deleting his notes."
      />
      <UseCaseCard
        name='Michelle'
        title='One Time Password'
        body='Michelle is an I.T. Administrator that sets up new email accounts for employees. Michelle uses Tempnote to limit the views of a password to 1 and sends it to the employee.'
      />
      <UseCaseCard
        name='Sandy'
        title='Discount Codes'
        body='Sandy uses Tempnote as a marketing tool to post discount codes for her online shop. She offers a discount code for the first 100 users that click on the link.'
      />
      <UseCaseCard
        name='Maryanne'
        title='Manual Delete'
        body='Maryanne accidentally sent her note to the wrong recipient. Luckily she used the "manual destruction link" feature and invalidated the link before the expiry date.'
      />
      <UseCaseCard
        name='David'
        title='Password Protection'
        body="David puts a password on all of his notes to ensure anyone with the note's link can't access it."
      />
      <UseCaseCard
        name='Eugene'
        title='Top Secret Information'
        body='Eugene uses Tempnote to send top secret information. He sets an expiry time of 30 minutes, password protects it with a complex password and limits the views to 1.'
      />
    </SimpleGrid>
  </Box>
);

export default UseCasesGrid;
