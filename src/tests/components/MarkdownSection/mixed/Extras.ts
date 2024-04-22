import { it } from 'vitest';
import { PARAGRAPH_HTML_TAG, getRender } from '../helpers/index';
import { firstOrUndefinedOf, nthOrUndefinedOf } from '~/util/array/Selector';

const helloContent = "hello";
it.concurrent("Should preserve spaces", ({ expect }) => {
  const spacedContent = ` ${helloContent}`;
  const { testId, render } = getRender(`\`${helloContent}\`${spacedContent}`);
  const section = render.getByTestId(testId);
  
  const paragraphList = Array.from(section.querySelectorAll(PARAGRAPH_HTML_TAG) ?? []);

  expect(paragraphList.length).toBe(1);
  const paragraph = paragraphList[0];
  const paragraphChildren = Array.from(paragraph.childNodes);
  
  const span = firstOrUndefinedOf(paragraphChildren);
  const text = nthOrUndefinedOf(paragraphChildren, 1);
  
  expect(span instanceof HTMLSpanElement).toBe(true);
  expect(text instanceof Text).toBe(true);
  expect(span?.textContent).toBe(helloContent);
  expect(text?.textContent).toBe(spacedContent);
});
