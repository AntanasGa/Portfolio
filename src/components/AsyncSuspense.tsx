import { MutableRefObject, PropsWithChildren } from 'react';
import { usePromiseSuspense } from '~/util/hooks';

interface AsyncSuspenseProps<T> {
  fn: (() => Promise<T>),
  /** ref updates a cycle after promise resolves */
  response?: MutableRefObject<T>
}

export default function AsyncSuspense<T>({ fn, response, children }: PropsWithChildren<AsyncSuspenseProps<T>>) {
  const suspenseResolver = usePromiseSuspense(fn);
  if (response) {
    response.current = suspenseResolver;
  }
  
  return children;
}
