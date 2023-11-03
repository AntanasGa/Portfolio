import { describe, it } from 'vitest';
import { getRender } from './helpers/fixture';

describe("initialize", () => {
  it.concurrent("should be empty", ({ expect }) => {
    const { testId, render } = getRender();
    const section = render.getByTestId(testId);
    expect(section).toBeDefined();
    expect(section.innerHTML).toBe('');
    expect(Array.from(section.children).length).toBe(0)
  });
});
