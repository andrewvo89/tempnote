import AccessPage from '@page-components/AccessPage';
import * as server from '@server/pages/access/[accessLinkId]';

export const getServerSideProps = server.getServerSideProps;

export default AccessPage;
