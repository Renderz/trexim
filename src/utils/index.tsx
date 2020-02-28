export function currency(text: any, rate: number = 2, precision: number = 2) {
  if ([null, undefined].includes(text)) return text;

  const ratio = 10 ** rate;
  const str = `${(Number(text) / ratio).toFixed(Math.max(precision, 0))}`;
  const int = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');
  const decimal = str.substring(str.length, str.indexOf('.'));
  return `${int}${decimal}`;
}
