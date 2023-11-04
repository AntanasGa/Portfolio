import { it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

const helloContent = "hello";
it.concurrent("Should have codeSpan with hello", ({ expect }) => {
  const { testId, render } = getRender(`\`${helloContent}\``);
  const section = render.getByTestId(testId);
  
  const codeSpanList = Array.from(section.querySelectorAll("span") ?? []);

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(codeSpanList.length).toBe(1);
  expect(firstOrUndefinedOf(codeSpanList)?.innerHTML).toBe(`${helloContent}`);
});
