const size = {
  xs: `320px`,
  xm: `468px`,
  sxm: `545px`,
  sm: `768px`,
  lg: `1200px`,
  bigLg: `1900px`,
};
const device = {
  xs: `max-width: ${size.xs}`,
  xm: `max-width: ${size.xm}`,
  sxm: `max-width: ${size.sxm}`,
  sm: `max-width: ${size.sm}`,
  lg: `max-width: ${size.lg}`,
  bigLg: `min-width: ${size.bigLg}`,
};
const breakpoints = { size, device };
export default breakpoints;
