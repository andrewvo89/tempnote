import dayjs from 'dayjs';
import { getPluralText } from '@utils/data';
import { getRelativeReadableTime } from '@utils/date';
import { Props } from '@page-components/SuccessPage/ExpiryCard/types';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

/**
 * Card to show expiry time of note.
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const ExpiryCard = (props: Props): JSX.Element => {
  const { currentTime, expiryDate, viewsLimitEnabled, viewsLimit } = props;

  return (
    <Box p='16px' borderWidth='1px' borderRadius='8px'>
      <Stat>
        <StatLabel>Expiry Date</StatLabel>
        <StatNumber>
          {dayjs(expiryDate).format('ddd, MMM D, YYYY h:mm A')}
        </StatNumber>
        <StatHelpText>
          {getExpiryText(
            currentTime,
            expiryDate,
            viewsLimitEnabled,
            viewsLimit,
          )}
        </StatHelpText>
      </Stat>
    </Box>
  );
};

const getExpiryText = (
  currentTime: number,
  expiryDate: number,
  viewsLimitEnabled: boolean,
  viewsLimit: number | null,
) => {
  if (currentTime >= expiryDate) {
    return 'Your note has expired';
  }
  const expiryText = getRelativeReadableTime(currentTime, expiryDate, 60);
  const text = `Your note will expire ${expiryText}`;
  if (viewsLimitEnabled && viewsLimit) {
    return `${text} or after ${viewsLimit} ${getPluralText(
      'view',
      viewsLimit,
    )}`;
  }
  return `${text}`;
};

export default ExpiryCard;
