export const assertUnreachable = (neverValue?: never) => {
  throw new TypeError(
    `Didn't expect to get here (exhaustiveness-check), Unexpected value: ${neverValue}`,
  );
};
