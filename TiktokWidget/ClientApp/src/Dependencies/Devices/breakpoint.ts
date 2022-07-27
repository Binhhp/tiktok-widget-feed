const size = {
  xs: `320px`,
  xm: `468px`,
  sxm: `545px`,
  sm: `768px`,
  lg: `1200px`,
  bigLg: `1900px`,
};

const imgSize = (height: number): number => {
  let size = 0.6;
  let device = 0;
  if (window.innerHeight > 900) {
    device = 0.2;
  }
  if (height * 0.6 > window.innerHeight) {
    size = 0.5;
  }
  if (height * 0.5 > window.innerHeight) {
    size = 0.4;
  }
  if (height * 0.4 > window.innerHeight) {
    size = 0.3;
  }
  if (height * 0.3 > window.innerHeight) {
    size = 0.2;
  }
  if (height * 0.2 > window.innerHeight) {
    size = 0.2;
  }
  if (height * 0.2 > window.innerHeight) {
    size = 0.1;
  }
  return size + device;
};

const device = {
  xs: `max-width: ${size.xs}`,
  xm: `max-width: ${size.xm}`,
  sxm: `max-width: ${size.sxm}`,
  sm: `max-width: ${size.sm}`,
  lg: `max-width: ${size.lg}`,
  betweenLgToBigLg: `max-width:${size.sm} and max-width: ${size.bigLg}`,
  bigLg: `min-width: ${size.bigLg}`,
};
const breakpoints = { size, device, imgSize };
export default breakpoints;
