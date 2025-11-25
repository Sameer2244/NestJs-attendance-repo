export function formatTimestamp(timestamp: string, use24Hour: boolean = false) {
  const date = new Date(timestamp);

  // Format hours and minutes with leading zeros
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // 12-hour format with AM/PM (optional)
  let timeStr;
  if (!use24Hour) {
    const period = Number(hours) >= 12 ? 'PM' : 'AM';
    const displayHours = Number(hours) % 12 || 12;
    timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes} ${period}`;
  } else {
    timeStr = `${hours}:${minutes}`;
  }

  // Format date as DD-MM-YYYY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
  const year = date.getFullYear();

  const dateStr = `${day}-${month}-${year}`;

  return {
    time: timeStr,
    date: dateStr,
  };
}
