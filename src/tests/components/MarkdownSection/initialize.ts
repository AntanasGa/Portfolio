import { it } from 'vitest';
import { getRender } from './helpers/fixture';

it.concurrent("Parser should work, should be empty when nothing is passed", ({ expect }) => {
  const { testId, render } = getRender();
  const section = render.getByTestId(testId);
  expect(section).toBeDefined();
  expect(section.innerHTML).toBe('');
  expect(Array.from(section.children).length).toBe(0)
});
