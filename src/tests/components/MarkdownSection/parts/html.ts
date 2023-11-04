import { it } from 'vitest';
import { PARAGRAPH_HTML_TAG, getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

const helloContent = "hello";
it.concurrent("Should work with anchor elements by default", ({ expect }) => {
  const expectedTag = "a";
  const { testId, render } = getRender(`<${expectedTag}>${helloContent}</${expectedTag}>`);
  const section = render.getByTestId(testId);
  
  const htmlElementList = Array.from(section.querySelectorAll(expectedTag) ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(htmlElementList.length).toBe(1);
  expect(firstOrUndefinedOf(htmlElementList)?.innerHTML).toBe(`${helloContent}`);
});

it.concurrent("Should work with image elements by default", ({ expect }) => {
  const expectedTag = "img";
  const { testId, render } = getRender(`<${expectedTag} />`);
  const section = render.getByTestId(testId);
  
  const htmlElementList = Array.from(section.querySelectorAll(expectedTag) ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(htmlElementList.length).toBe(1);
  expect(firstOrUndefinedOf(htmlElementList)?.tagName.toLowerCase()).toBe(expectedTag);
});

it.concurrent("Should not work with script by default", ({ expect }) => {
  const expectedTag = "script";
  const inputHtml = `<${expectedTag}>alert('');</${expectedTag}>`;
  const { testId, render } = getRender(inputHtml);
  const section = render.getByTestId(testId);
  
  const htmlElementList = Array.from(section.querySelectorAll(expectedTag) ?? []);

  expect(section).toBeDefined();

  expect(htmlElementList.length).toBe(0);
  expect(section.innerHTML).toBe(inputHtml.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"));
});

it.concurrent("Should block anchor on empty config list", ({ expect }) => {
  const expectedTag = "a";
  const inputHtml = `<${expectedTag}>hello</${expectedTag}>`;
  const { testId, render } = getRender(inputHtml, { html: { allowedTags: [] } });
  const section = render.getByTestId(testId);
  
  const htmlElementList = Array.from(section.querySelectorAll(expectedTag) ?? []);

  expect(section).toBeDefined();

  expect(htmlElementList.length).toBe(0);
  expect(section.innerHTML).toBe(`<${PARAGRAPH_HTML_TAG}>${inputHtml.replace(/</gm, "&lt;").replace(/>/gm, "&gt;")}</${PARAGRAPH_HTML_TAG}>`);
});
