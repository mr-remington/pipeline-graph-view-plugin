/**
 * Returns formatted date from Unix epoch
 * @param epochTime - The epoch time in milliseconds
 * @param formatType - The format type: 'short' or 'full'
 */
export const formatDateTime = (
  epochTime: number,
  formatType: 'short' | 'full'
): string => {
  const date = new Date(epochTime);

  if (formatType === 'short') {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
      day: '2-digit',
      month: 'short',
    });
    const datePart = dateFormatter.format(date);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Convert 12-hour format without AM/PM
    const adjustedHours = hours % 12 || 12; // Converts 0 to 12
    const timePart = `${adjustedHours}:${minutes}`;

    return `${datePart}, ${timePart}`;
  } else if (formatType === 'full') {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  } else {
    throw new Error('Invalid format type');
  }
};
