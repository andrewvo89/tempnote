import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Props } from '@components/Feature/types';

export /**
 * Re-usable Feature component.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const Feature = (props: Props): JSX.Element => {
  const { title, children, icon } = props;
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Stack
      spacing={{ base: '3', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box fontSize='6xl'>{icon}</Box>
      <Stack spacing='1'>
        <Text fontWeight='extrabold' fontSize='lg'>
          {title}
        </Text>
        <Box color={color}>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default Feature;
