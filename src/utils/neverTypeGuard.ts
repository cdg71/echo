export const neverTypeGuard = (n: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Unexpected family ${n}.`);
};
