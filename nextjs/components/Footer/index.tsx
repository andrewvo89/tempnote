import { AppContext } from '@components/AppProvider/ContextProvider';
import { useContext, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Text,
  Flex,
  Link,
  Divider,
  useColorMode,
} from '@chakra-ui/react';

/**
 * Footer component for the app.
 * @return {*}  {JSX.Element}
 */
const Footer = (): JSX.Element => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { stickyFooter, setFooterHeight } = useContext(AppContext);
  const { colorMode } = useColorMode();
  const darkMode = colorMode === 'dark';
  const headerColor = darkMode
    ? 'var(--chakra-colors-gray-800)'
    : 'var(--chakra-colors-white)';

  // Update footer height to add padding bottom to content
  useEffect(() => {
    const handleResize = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setFooterHeight]);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }, [setFooterHeight]);

  return (
    <Flex
      ref={footerRef}
      direction='column'
      w='full'
      align='center'
      position={stickyFooter ? 'fixed' : 'unset'}
      bottom={stickyFooter ? '0' : 'unset'}
      backgroundColor={headerColor}
      zIndex={2}
      opacity={0.9}
    >
      <Divider />
      <Box as='footer' pt={2} pb={4} px={[6, 0]}>
        <Stack
          spacing={['2', '8']}
          direction={['column', 'row']}
          align='center'
        >
          <Text fontSize='sm'>
            &copy; {new Date().getFullYear()} Tempnote, All rights reserved
          </Text>
          <Text fontSize='sm'>
            <Link
              fontSize='sm'
              color='blue.400'
              href='https://github.com/andrewvo89/tempnote'
              target='_blank noopener noreferrer'
            >
              Open Source
            </Link>
            {' under the '}
            <Link
              fontSize='sm'
              color='blue.400'
              href='https://github.com/andrewvo89/tempnote/blob/main/LICENSE'
              target='_blank noopener noreferrer'
            >
              MIT License
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Footer;
