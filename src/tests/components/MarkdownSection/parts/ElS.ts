import { it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '~/util/array/Selector';

const helloContent = "hello";
it.concurrent("Should have s wrapping hello", ({ expect }) => {
  const { testId, render } = getRender(`~~${helloContent}~~`);
  const section = render.getByTestId(testId);
  
  const strongElementList = Array.from(section.querySelectorAll("s") ?? []);

  expect(section).toBeDefined();
  
  expect(strongElementList.length).toBe(1);
  expect(firstOrUndefinedOf(strongElementList)?.innerHTML).toBe(helloContent);
});
