export default function formatEpocToLocalTime(epoch: number) {
  const date = new Date(epoch);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}
