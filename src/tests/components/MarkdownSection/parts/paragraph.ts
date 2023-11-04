import { it } from 'vitest';
import { getRender, PARAGRAPH_HTML_TAG } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

const helloContent = "hello";
it.concurrent("Should have paragraph with hello", ({ expect }) => {
  const { testId, render } = getRender(`${helloContent}`);
  const section = render.getByTestId(testId);
  
  const paragraphList = Array.from(section.querySelectorAll(PARAGRAPH_HTML_TAG) ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(paragraphList.length).toBe(1);
  expect(firstOrUndefinedOf(paragraphList)?.innerHTML).toBe(helloContent);
});
