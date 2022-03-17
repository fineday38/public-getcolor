export function componentToHex(c: number) {
  var hex = c.toString(16).toUpperCase();
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r:number, g:number, b:number) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function toRGB(number: number) {
  const r = (number & 0xff0000) >> 16;
  const g = (number & 0x00ff00) >> 8;
  const b = (number & 0x0000ff);

  return `rgb(${r}, ${g}, ${b})`;
}
export function toHex(number: number) {
  const r = (number & 0xff0000) >> 16;
  const g = (number & 0x00ff00) >> 8;
  const b = (number & 0x0000ff);

  return rgbToHex(r,g,b);
}
