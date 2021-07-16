import { Props } from '@page-components/FAQPage/FAQItems/FAQItem/types';
import {
  Text,
  Heading,
  VStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Single FAQ item component.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const FAQItem = (props: Props): JSX.Element => (
  <VStack align='flex-start'>
    <Heading size='md'>{props.question}</Heading>
    <Text color={mode('gray.600', 'gray.400')}>{props.answer}</Text>
  </VStack>
);

export default FAQItem;
