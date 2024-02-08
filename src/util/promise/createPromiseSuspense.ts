
export default function createPromiseSuspense<T>(promise: Promise<T>): (() => T) {
  let resolveValue: T | void = void 0;
  let rejectValue: unknown = void 0;

  promise.then((r) => resolveValue = r)
    .catch((err) => rejectValue = err);
  
    return () => {
    if (rejectValue !== void 0) {
      throw rejectValue;
    }
    if (resolveValue === void 0) {
      throw promise
    }

    return resolveValue;
  }
}
