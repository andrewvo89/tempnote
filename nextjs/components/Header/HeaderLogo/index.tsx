import styles from '@components/Header/HeaderLogo/styles.module.scss';
import {
  Link,
  Heading,
  useBreakpointValue,
  Image,
  useColorMode,
} from '@chakra-ui/react';

/**
 * Header logo component.
 * @return {*}  {JSX.Element}
 */
const HeaderLogo = (): JSX.Element => {
  const logoHeaderSize = useBreakpointValue(['md', 'lg']);
  const { colorMode } = useColorMode();
  const className = colorMode === 'dark' ? styles['logo-dark-mode'] : '';

  return (
    <Heading size={logoHeaderSize}>
      <Link
        href='/'
        position='relative'
        _focus={{
          boxShadow: 'none',
        }}
      >
        <Image
          src='/logo/tempnote_logo_FA-01.svg'
          alt='logo'
          width={['28', '3xs']}
          className={className}
        />
      </Link>
    </Heading>
  );
};

export default HeaderLogo;
