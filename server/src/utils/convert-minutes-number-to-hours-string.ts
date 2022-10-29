/**
 * 1080 -> 18:00
 * @param minutes
 */
export function convertMinutesNumberToHourString(minutesAmout: number) {
  const hours = Math.floor(minutesAmout / 60);
  const minutes = minutesAmout % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}