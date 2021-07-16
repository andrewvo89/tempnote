import DotLoader from 'react-spinners/DotLoader';
import usePrevious from '@hooks/usePrevious';
import { Flex, Text } from '@chakra-ui/react';
import { Props } from '@components/FullPageSpinner/types';
import { useEffect, useState } from 'react';

/**
 * Full page spinner component.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const FullPageSpinner = (props: Props): JSX.Element => {
  const { show } = props;
  const prevShow = usePrevious(show);
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    if (prevShow && !show) {
      // Delay display:none to allow opacity transition to happen
      setTimeout(() => {
        setDisplay('none');
      }, 500);
    }
    if (!prevShow && show) {
      setDisplay('flex');
    }
  }, [show, prevShow]);

  return (
    <Flex
      display={display}
      justify='center'
      align='center'
      direction='column'
      gridGap='8px'
      position='fixed'
      left='0px'
      top='0px'
      width='100vw'
      height='100vh'
      zIndex={10}
      color='var(--chakra-colors-white)'
      background='var(--chakra-colors-blackAlpha-800)'
      transition='opacity 500ms ease-in'
      opacity={props.show ? 1 : 0}
    >
      <DotLoader color='var(--chakra-colors-gray-200)' />
      {/* <CircularProgress isIndeterminate capIsRound /> */}
      <Text fontWeight='500'>Loading...</Text>
    </Flex>
  );
};
export default FullPageSpinner;
