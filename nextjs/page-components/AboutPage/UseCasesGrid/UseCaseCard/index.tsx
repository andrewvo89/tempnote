import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Props } from '@page-components/AboutPage/UseCasesGrid/UseCaseCard/types';

/**
 * Card component for use case.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const UseCaseCard = (props: Props): JSX.Element => {
  const { name, title, body } = props;
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bg} rounded='lg' shadow='base' overflow='hidden' p={4}>
      <Stack spacing={4} align='center'>
        <Avatar
          size='xl'
          src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`}
        />
        <Stack spacing={1} align='center'>
          <Text fontWeight='extrabold' fontSize='lg'>
            {title}
          </Text>
          <Box color={color}>{body}</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UseCaseCard;
