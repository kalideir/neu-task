export const breakpoints: { [index: string]: number } = {
  xs: 200,
  sm: 400,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mq = Object.keys(breakpoints)
  .map(key => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
