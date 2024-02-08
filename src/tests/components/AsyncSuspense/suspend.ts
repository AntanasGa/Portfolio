import { beforeAll, describe, it, vi } from 'vitest';
import { completedContentRender, fallbackComponentRender, getRender } from './helpers/fixture';
import { act } from '@testing-library/react';

describe("Promise interactions", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  
  it("Should hold suspense until promise is complete", async ({ expect }) => {
    const fallback = fallbackComponentRender();
    const completed = completedContentRender();

    const { testId, render } = getRender(() => new Promise((resolve) => resolve('completed')));
    const section = render.getByTestId(testId);
    expect(section.innerHTML).toBe(fallback);

    await act(() => vi.advanceTimersByTime(1));
  
    const reselect = render.getByTestId(testId);
    expect(reselect.innerHTML).toBe(completed);
  });

  it("Should attach ref to response", async ({ expect }) => {
    const expectValue = true;
    const actualValueInitial = false;
    const actualValue = { current: actualValueInitial };

    const fallback = fallbackComponentRender();
    const completed = completedContentRender();

    const { testId, render } = getRender(
      () => new Promise((resolve) => resolve(expectValue)),
      actualValue
    );

    const section = render.getByTestId(testId);
    expect(section.innerHTML).toBe(fallback);
    expect(actualValue.current).toBe(actualValueInitial);

    await act(() => vi.advanceTimersByTime(1));

    const reselect = render.getByTestId(testId);
    expect(reselect.innerHTML).toBe(completed);
    expect(actualValue.current).toBe(expectValue);

    // ref update happens next refresh cycle
    await act(() => vi.advanceTimersByTime(1));
    expect(actualValue.current).toBe(expectValue);
  });
});
