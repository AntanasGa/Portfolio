import { useEffect } from "react";
import ShallowArrayEqual from "../array/ShallowArrayEqual";

interface ICacheItem<T> {
  promise: Promise<T>,
  resolve?: T,
  reject?: unknown,
  dependancies?: unknown[]
}


// `use` react hook is still experimental
const cache = new Map<string, ICacheItem<unknown>>();

/**
 * Suspends component rendering until a promise is resolved or rejected.
 */
export default function usePromiseSuspense<T>(promise: () => Promise<T>, dependancies?: unknown[]): T {
  // stack does not have a standard structure, on dev we'll always double cache due to vite chunks
  const callstack = new Error().stack;
  if (callstack === undefined) {
    throw new Error("Callstack is undefined");
  }

  useEffect(
    () => {
      return () => {
        if (cache.has(callstack)) {
          cache.delete(callstack);
        }
      };
    },
    [callstack]
  );

  if (cache.has(callstack) && dependancies) {
    const innerPromise = cache.get(callstack) as ICacheItem<T>;
    if (innerPromise.dependancies) {
      if (!ShallowArrayEqual(innerPromise.dependancies, dependancies)) {
        cache.delete(callstack);
      }
    }
  }

  if (!cache.has(callstack)) {
    const cacheValue = {} as ICacheItem<T>;
    cacheValue.promise = promise()
    .then(r => cacheValue.resolve = r)
    .catch(err => cacheValue.reject = err)

    if (dependancies) {
      cacheValue.dependancies = dependancies;
    }

    cache.set(callstack, cacheValue);
  }
  const innerPromise = cache.get(callstack) as ICacheItem<T>;
  
  if ("reject" in innerPromise) {
    throw innerPromise.reject;
  }

  if (!("resolve" in innerPromise)) {
    throw innerPromise.promise;
  }
  return innerPromise.resolve as T;
}
