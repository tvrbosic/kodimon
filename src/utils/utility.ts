export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function roundToTwoDecimalPlaces(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
