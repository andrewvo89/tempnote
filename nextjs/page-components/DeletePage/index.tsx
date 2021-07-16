import DeleteConfirmationDialog from '@page-components/DeletePage/DeleteConfirmationDialog';
import Note from '@models/note';
import NoteSkeleton from '@components/NoteSkeleton';
import PasswordModal from '@components/PasswordModal';
import { ActionTypes, NoteStatuses } from '@models/note/types';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Container, Heading, useToast, VStack } from '@chakra-ui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Props } from '@page-components/DeletePage/types';
import { useRouter } from 'next/dist/client/router';

/**
 * Page to delete a note.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const DeletePage = (props: Props): JSX.Element => {
  const { setAppLoading, setStickyFooter } = useContext(AppContext);
  const toast = useToast();
  const router = useRouter();
  const {
    query: { deleteLinkId },
    push,
  } = router;

  const [password, setPassword] = useState<string>('');
  const [note, setNote] = useState<Note | undefined>();
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  // Set initial footer to sticky while showing skeleton
  useEffect(() => {
    setStickyFooter(true);
  }, [setStickyFooter]);

  // Detect if content is not overflowing
  useEffect(() => {
    // Wait for server side tasks to finish
    if (!process.browser || note?.status !== NoteStatuses.UNLOCKED) {
      return;
    }
    setStickyFooter(document.body.offsetHeight <= window.innerHeight);
  }, [note, setStickyFooter]);

  useEffect(() => {
    const newNote = new Note(props.title, props.content, props.status);
    setNote(newNote);
  }, [props]);

  useEffect(() => {
    if (!note) {
      return;
    }
    // Once a valid green light from getServerSideProps
    if (note.status === NoteStatuses.VALID) {
      const getNote = async () => {
        const newNote = await Note.get(
          deleteLinkId as string,
          ActionTypes.DELETE,
        );
        setNote(newNote);
        setAppLoading(false);
      };
      getNote();
    }

    // If invalid from api call
    if (note.status === NoteStatuses.INVALID) {
      push('/404');
    }

    // Control password modal show
    setShowPasswordModal(note.status === NoteStatuses.LOCKED);
    setShowConfirmationModal(note.status === NoteStatuses.UNLOCKED);
  }, [note, setAppLoading, deleteLinkId, push]);

  /**
   * Use password to authenticate with the back end.
   * @param {{
   *     password: string;
   *   }} values
   * @return {*}  {Promise<void>}
   */
  const passwordSubmitHandler = async (values: {
    password: string;
  }): Promise<void> => {
    const deleteLinkId = router.query.deleteLinkId as string;
    // Store password for api call to confirm deletion
    setPassword(values.password);
    const note = await Note.unlock(
      deleteLinkId,
      values.password,
      ActionTypes.DELETE,
    );
    setNote(note);
  };

  /**
   * Go back to home page.
   * @return {*}  {void}
   */
  const cancelHandler = (): void => {
    router.push('/');
  };

  /**
   * Confirm note deletion.
   * @return {*}  {Promise<void>}
   */
  const confirmHandler = async (): Promise<void> => {
    const deleteLinkId = router.query.deleteLinkId as string;
    await Note.delete(deleteLinkId, password);
    setShowConfirmationModal(false);
    toast({
      title: 'Note Deleted',
      description: 'Your note has been deleted successfully',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    router.push('/');
  };

  return (
    <Container
      maxW='2xl'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
    >
      <DeleteConfirmationDialog
        showModal={showConfirmationModal}
        cancelHandler={cancelHandler}
        confirmHandler={confirmHandler}
      />
      <PasswordModal
        showModal={showPasswordModal}
        submitHandler={passwordSubmitHandler}
      />
      <VStack spacing='24px' padding='12px' alignItems='stretch'>
        {note?.title && note?.content ? (
          <Fragment>
            <Heading>{note.title}</Heading>
            <div
              dangerouslySetInnerHTML={{
                __html: note.content,
              }}
            />
          </Fragment>
        ) : (
          <NoteSkeleton />
        )}
      </VStack>
    </Container>
  );
};

export default DeletePage;
