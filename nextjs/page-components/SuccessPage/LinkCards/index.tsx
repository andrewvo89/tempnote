import LinkCard from '@page-components/SuccessPage/LinkCards/LinkCard';
import Note from '@models/note';
import { Box, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { LockIcon } from '@chakra-ui/icons';
import { Props } from '@page-components/SuccessPage/LinkCards/types';

/**
 * Collection of card components for links.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const LinkCards = (props: Props): JSX.Element => {
  const { accessLinkId, deleteLinkEnabled, deleteLinkId, passwordEnabled } =
    props;
  const accessLink = Note.getLink(accessLinkId, 'access');
  const deleteLink = Note.getLink(deleteLinkId, 'delete');
  return (
    <Box p='16px' borderWidth='1px' borderRadius='8px'>
      <VStack spacing='16px'>
        <LinkCard
          tooltipLabel={`Use this link to access your protected note${
            passwordEnabled ? ' using your password' : ''
          }`}
          formLabel={
            <Fragment>
              {passwordEnabled && <LockIcon mr='4px' />}
              Access Link
            </Fragment>
          }
          link={accessLink}
        />
        {deleteLinkEnabled && (
          <LinkCard
            tooltipLabel={`Use this link to permanently delete your note before the expiry date${
              passwordEnabled ? ' using your password' : ''
            }`}
            formLabel={
              <Fragment>
                {passwordEnabled && <LockIcon mr='4px' />}
                Delete Link
              </Fragment>
            }
            link={deleteLink}
          />
        )}
      </VStack>
    </Box>
  );
};

export default LinkCards;
