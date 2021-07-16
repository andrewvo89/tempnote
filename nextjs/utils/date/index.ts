import dayjs from 'dayjs';

/**
 * Gets readable relative time based on arguments.
 * @param {(Date | number)} startDate
 * @param {(Date | number)} endDate
 * @param {number} minsToShowDetails
 * @return {*}  {string}
 */
export const getRelativeReadableTime = (
  startDate: Date | number,
  endDate: Date | number,
  minsToShowDetails: number,
): string => {
  // Create dayjs objects
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  // Get minute and second differences
  const minutesDiff = end.diff(start, 'minutes');
  const secondsDiff = end.diff(start, 'seconds');
  // If less than certain minutes, show extra countdown timer
  if (minutesDiff <= minsToShowDetails) {
    const secondsInMinute = secondsDiff % 60;
    const minutesText = `${minutesDiff} minutes`;
    const secondsText = `${secondsInMinute} seconds`;
    if (minutesDiff === 0) {
      return `in ${secondsText}`;
    }
    return `in ${minutesText} and ${secondsText}`;
  }
  // Show default dayjs (less detailed) relative time
  return start.to(end);
};
