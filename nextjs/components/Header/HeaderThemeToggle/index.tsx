import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Props } from '@components/Header/HeaderThemeToggle/types';
import {
  IconButton,
  useColorMode,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';

/**
 * Provides a toggle button to toggle dark mode.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const HeaderThemeToggle = (props: Props): JSX.Element => {
  const { darkMode } = props;
  const { toggleColorMode } = useColorMode();
  const icon = darkMode ? <SunIcon /> : <MoonIcon />;
  const label = darkMode ? 'Light Mode' : 'Dark Mode';
  const iconButtonSize = useBreakpointValue(['sm', 'md']);

  return (
    <Tooltip label={label}>
      <IconButton
        size={iconButtonSize}
        rounded='md'
        aria-label={label}
        icon={icon}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export default HeaderThemeToggle;
