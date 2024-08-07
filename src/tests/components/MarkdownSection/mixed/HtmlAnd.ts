import { it } from 'vitest';
import { PARAGRAPH_HTML_TAG, getRender } from '../helpers/index';
import { firstOrUndefinedOf, nthOrUndefinedOf } from '~/util/array/Selector';

const helloContent = "hello";
it.concurrent("Should mix well with strong", ({ expect }) => {
  const expectedTag = "a";
  const { testId, render } = getRender(`**${helloContent}**<${expectedTag}>${helloContent}</${expectedTag}>`);

  const section = render.getByTestId(testId);

  const strongElementList = Array.from(section.querySelectorAll("strong") ?? []);

  expect(section).toBeDefined();
  
  expect(strongElementList.length).toBe(1);
  expect(firstOrUndefinedOf(strongElementList)?.innerHTML).toBe(helloContent);

  const anchorElementList = Array.from(section.querySelectorAll(expectedTag) ?? []);
  expect(anchorElementList.length).toBe(1);
  
  const anchorElement = firstOrUndefinedOf(anchorElementList);

  expect(anchorElement).toBeDefined();
  expect(anchorElement?.innerHTML).toBe(helloContent);
});

it.concurrent("Should mix well with multi line", ({ expect }) => {
  const expectedTag = "a";
  const { testId, render } = getRender(`<${expectedTag}>

${helloContent}</${expectedTag}>`);

  const section = render.getByTestId(testId);

  expect(section).toBeDefined();
  expect(Array.from(section.children ?? []).length).toBe(1);
  const likelyAnchor = section.firstChild;
  expect(likelyAnchor instanceof HTMLAnchorElement).toBe(true);
  if (!(likelyAnchor instanceof HTMLAnchorElement)) {
    return;
  }

  expect(Array.from(likelyAnchor.children ?? []).length).toBe(1);
  expect(likelyAnchor.firstElementChild?.nodeName.toLowerCase()).toBe(PARAGRAPH_HTML_TAG);
  const elementContents = likelyAnchor.firstElementChild instanceof Element ? likelyAnchor.firstElementChild : undefined;
  expect(elementContents?.innerHTML).toBe(helloContent);
});

it.concurrent("Should mix well with paragraph above", ({ expect }) => {
  const expectedTag = "a";
  const { testId, render } = getRender(`${helloContent}

  <${expectedTag}>${helloContent}</${expectedTag}>`);
  const section = render.getByTestId(testId);

  expect(section).toBeDefined();
  
  const sectionChildrenList = Array.from(section.children ?? []);
  expect(sectionChildrenList.length).toBe(3);

  // html gets wrapped in paragraph
  const expectedTagList = [PARAGRAPH_HTML_TAG, "br", PARAGRAPH_HTML_TAG].map(x => x.toLowerCase());
  expect(expectedTagList.every((x, i) => x === sectionChildrenList[i].tagName.toLowerCase())).toBe(true);
  
  const helloContentParagraph = firstOrUndefinedOf(sectionChildrenList);

  expect(helloContentParagraph?.innerHTML).toBe(helloContent);
  
  const htmlContentParagraph = nthOrUndefinedOf(sectionChildrenList, -1);

  expect(Array.from(htmlContentParagraph?.children ?? []).length).toBe(1);
  
  const htmlExpectedQueryList = htmlContentParagraph?.querySelectorAll(expectedTag);
  expect(Array.from(htmlExpectedQueryList ?? []).length).toBe(1);
  expect(firstOrUndefinedOf(Array.from(htmlExpectedQueryList ?? []))?.innerHTML).toBe(helloContent);
});

it.concurrent("Should mix well with header inside", ({ expect }) => {
  const expectedTag = "a";
  const { testId, render } = getRender(`<${expectedTag}>

# ${helloContent}

</${expectedTag}>`);
  const section = render.getByTestId(testId);

  expect(section).toBeDefined();

  expect(Array.from(section.children).length).toBe(1);
  const likelyAnchor = section.firstChild;
  expect(likelyAnchor?.nodeName.toLowerCase()).toBe(expectedTag);
  if (!(likelyAnchor instanceof HTMLAnchorElement)) {
    return;
  }

  expect(Array.from(likelyAnchor.children ?? []).length).toBe(1);
  
  const likelyHeader = likelyAnchor.firstElementChild;

  expect(likelyHeader?.nodeName.toLowerCase()).toBe("h1");
  if (!(likelyHeader instanceof HTMLHeadingElement)) {
    return;
  }
  
  const headerElementList = Array.from(section.querySelectorAll("h1"));
  expect(headerElementList.length).toBe(1);
  expect(firstOrUndefinedOf(headerElementList)?.innerHTML).toBe(helloContent);
});
