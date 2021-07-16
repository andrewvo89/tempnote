import SuccessPage from '@page-components/SuccessPage';
import * as server from '@server/pages/success';

export const getServerSideProps = server.getServerSideProps;

export default SuccessPage;
