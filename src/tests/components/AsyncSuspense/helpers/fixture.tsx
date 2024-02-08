import { render } from '@testing-library/react';
import { MutableRefObject, Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import AsyncSuspense from '~/components/AsyncSuspense';
import { uuidv4 } from '~/util/string/Guid';


// for adding fixtures we can ignore the eslint rule
// eslint-disable-next-line react-refresh/only-export-components
const FallbackComponent = () => <div>fallback</div>;

// eslint-disable-next-line react-refresh/only-export-components
const CompletedContent = () => <div>completed</div>;

export const fallbackComponentRender = () => renderToString(<FallbackComponent />);

export const completedContentRender = () => renderToString(<CompletedContent />);

export const getRender = <T,>( fn: () => Promise<T>, response?: MutableRefObject<T>) => {
  const testId = uuidv4();
  return {
    testId,
    render: render(
      <div data-testid={ testId }>
        <Suspense fallback={ <FallbackComponent /> }>
          <AsyncSuspense fn={ fn } response={ response }>
            <CompletedContent />
          </AsyncSuspense>
        </Suspense>
      </div>
    ),
  };
}

