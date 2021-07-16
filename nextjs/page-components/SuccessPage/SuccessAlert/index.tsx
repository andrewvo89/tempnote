import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Collapse,
} from '@chakra-ui/react';

/**
 * Alert component for successful note creation.
 * @return {*}  {JSX.Element}
 */
const SuccessAlert = (): JSX.Element => {
  const [close, setClose] = useState<boolean>(false);

  return (
    <Collapse in={!close} animateOpacity>
      <Alert
        status='info'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        padding='16px 0'
        rounded='md'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Note created!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Your note has been created successfully
        </AlertDescription>
        <CloseButton
          position='absolute'
          right='8px'
          top='8px'
          onClick={() => setClose(true)}
        />
      </Alert>
    </Collapse>
  );
};

export default SuccessAlert;
