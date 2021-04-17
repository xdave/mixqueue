export const unThunk = <P extends any[], R>(
  thunk: (...params: P) => (...args: any[]) => R
) => (thunk as unknown) as (...params: P) => R;
