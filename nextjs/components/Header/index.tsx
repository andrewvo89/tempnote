import HeaderLinks from '@components/Header/HeaderLinks';
import HeaderLogo from '@components/Header/HeaderLogo';
import HeaderThemeToggle from '@components/Header/HeaderThemeToggle';
import { Box, HStack, useColorMode } from '@chakra-ui/react';

/**
 * App Header component.
 * @return {*}  {JSX.Element}
 */
const Header = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const darkMode = colorMode === 'dark';
  const headerColor = darkMode
    ? 'var(--chakra-colors-gray-800)'
    : 'var(--chakra-colors-white)';
  return (
    <Box
      as='header'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      w='full'
      py={2}
      px={4}
      position='fixed'
      backgroundColor={headerColor}
      zIndex={2}
      opacity={0.9}
    >
      <HStack>
        <HeaderLogo />
      </HStack>
      <HStack spacing={[2, 4]}>
        <HeaderLinks />
        <HeaderThemeToggle darkMode={darkMode} />
      </HStack>
    </Box>
  );
};

export default Header;
