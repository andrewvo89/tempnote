import Note from '@models/note';
import NoteSkeleton from '@components/NoteSkeleton';
import PasswordModal from 'components/PasswordModal';
import { ActionTypes, NoteStatuses } from '@models/note/types';
import { AppContext } from '@components/AppProvider/ContextProvider';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Props } from '@page-components/AccessPage/types';
import { useRouter } from 'next/dist/client/router';

/**
 * Page to access a note.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const Accesspage = (props: Props): JSX.Element => {
  const { setAppLoading, setStickyFooter } = useContext(AppContext);
  const router = useRouter();
  const {
    query: { accessLinkId },
    push,
  } = router;
  const [note, setNote] = useState<Note | undefined>();
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  useEffect(() => {
    const newNote = new Note(props.title, props.content, props.status);
    setNote(newNote);
  }, [props]);

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
    if (!note) {
      return;
    }
    // Once a valid green light from getServerSideProps
    if (note.status === NoteStatuses.VALID) {
      const getNote = async () => {
        const newNote = await Note.get(
          accessLinkId as string,
          ActionTypes.ACCESS,
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
  }, [note, accessLinkId, setAppLoading, push]);

  /**
   * Submits a form the backend.
   * @param {{ password: string }} values
   */
  const submitHandler = async (values: { password: string }) => {
    const accessLinkId = router.query.accessLinkId as string;
    const password = values.password;
    const note = await Note.unlock(accessLinkId, password, ActionTypes.ACCESS);
    setNote(note);
  };

  return (
    <Container
      maxW='2xl'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
    >
      <PasswordModal
        showModal={showPasswordModal}
        submitHandler={submitHandler}
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

export default Accesspage;
