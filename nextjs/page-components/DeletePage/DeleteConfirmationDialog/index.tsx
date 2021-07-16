import { Props } from '@page-components/DeletePage/DeleteConfirmationDialog/types';
import { useRef, useState } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Collapse,
  CloseButton,
} from '@chakra-ui/react';

/**
 * Delete confirmation modal component.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const DeleteConfirmationDialog = (props: Props): JSX.Element => {
  const cancelRef = useRef(null);
  const { showModal, cancelHandler, confirmHandler } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  /**
   * Perform action from confirmHandler from props.
   * @return {*}  {Promise<void>}
   */
  const confirmClickHandler = async (): Promise<void> => {
    setShowError(false);
    setLoading(true);
    try {
      await confirmHandler();
    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      motionPreset='scale'
      onClose={() => null}
      isOpen={showModal}
      isCentered
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent w='md' maxW='95%'>
          <AlertDialogHeader>Delete Note</AlertDialogHeader>
          <AlertDialogBody>
            <Collapse in={showError} animateOpacity>
              <Alert status='error' mb='8px' rounded='md'>
                <AlertIcon />
                Something went wrong!
                <CloseButton
                  onClick={() => setShowError(false)}
                  position='absolute'
                  right='8px'
                  top='8px'
                />
              </Alert>
            </Collapse>
            Are you sure you want to delete this note?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={cancelHandler} isDisabled={loading}>
              No
            </Button>
            <Button
              onClick={confirmClickHandler}
              colorScheme='red'
              ml={3}
              isDisabled={loading}
              isLoading={loading}
              loadingText='Deleting...'
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
