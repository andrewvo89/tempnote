import DeletePage from '@page-components/DeletePage';
import * as server from '@server/pages/delete/[deleteLinkId]';

export const getServerSideProps = server.getServerSideProps;

export default DeletePage;
