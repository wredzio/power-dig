const success = <T>(value: T) => ({
  get _tag(): "success" {
    return "success";
  },
  value,
});

type Success<T> = ReturnType<typeof success<T>>;

const failure = <E>(error: E) => ({
  get _tag(): "failure" {
    return "failure";
  },
  error,
});

type Failure<E> = ReturnType<typeof failure<E>>;

export type Result<T, E> = Success<T> | Failure<E>;

export const fail = <E>(e: E): Failure<E> => {
  return failure(e);
};

export const succeed = <T>(t: T): Success<T> => {
  return success(t);
};

export const isSuccess = <T>(result: Result<T, unknown>): result is Success<T> => {
  return result._tag === "success";
};

export const isFailure = <E>(result: Result<unknown, E>): result is Failure<E> => {
  return result._tag === "failure";
};

export const unwrap = <T, E>(result: Result<T, E>, defaultValue?: T): T => {
  if (isSuccess(result)) {
    return result.value;
  }

  return defaultValue as T;
};

export const unwrapOrThrow = <T, E>(result: Result<T, E>): T => {
  if (isSuccess(result)) {
    return result.value;
  }

  throw result.error;
};
