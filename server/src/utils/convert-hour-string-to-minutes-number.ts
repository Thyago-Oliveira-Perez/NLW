/**
 * 18:00 -> ["18", "00"] -> [18, 00]
 * @param hourString 
 * @returns The hour converted to string
 */
export function convertHourStringToMinuteNumber(hourString: string){
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = ((hours * 60) + minutes);

  return minutesAmount;
}