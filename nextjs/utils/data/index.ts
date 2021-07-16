/**
 * Converts a noun into its plural equivalent depending on the quantity.
 * @param {string} text
 * @param {number} amount
 * @return {*}  {string}
 */
export const getPluralText = (text: string, amount: number): string => {
  if (amount == 1) {
    return text;
  }
  if (text.endsWith('s')) {
    return `${text}'`;
  }
  return `${text}s`;
};

/**
 * Copies the selected text to the clipboard.
 * @param {string} text
 * @return {*}  {void}
 */
export const copyToClipboard = (text: string): void => {
  if (!text) {
    return;
  }
  navigator.clipboard.writeText(text);
};
