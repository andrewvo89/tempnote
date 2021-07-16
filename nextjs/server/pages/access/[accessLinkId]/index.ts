import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { NoteStatuses } from '@server/models/note/types';
import { validate } from 'uuid';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessLinkId = context.params?.accessLinkId as string;

  // If not a valid uuid v4
  if (!validate(accessLinkId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      status: NoteStatuses.VALID,
    },
  };
};
