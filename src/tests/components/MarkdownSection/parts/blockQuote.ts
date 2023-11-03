import { describe, it } from 'vitest';
import { getRender, PARAGRAPH_HTML_TAG } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("blockQuote", () => {
  const helloContent = "hello";
  it.concurrent("Should have blockQuote with hello", ({ expect }) => {
    const { testId, render } = getRender(`> ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const blockquoteList = Array.from(section.querySelectorAll("blockquote") ?? []);
    

    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(blockquoteList.length).toBe(1);
    expect(firstOrUndefinedOf(blockquoteList)?.innerHTML).toBe(`<${PARAGRAPH_HTML_TAG}>${helloContent}</${PARAGRAPH_HTML_TAG}>`);
  });

  it.concurrent("Should work with multi level blockQuote", ({ expect }) => {
    const { testId, render } = getRender(`> > ${helloContent}`);
    const section = render.getByTestId(testId);
    
    expect(section).toBeDefined();
    
    expect(Array.from(section.children).length).toBe(1);
    
    const outerBlock = section.children[0];
    
    expect(outerBlock).toBeDefined()
    expect(outerBlock.tagName.toLowerCase()).toBe("blockquote");
    
    expect(Array.from(outerBlock.children).length).toBe(1);
    
    const innerBlock = outerBlock.children[0];

    expect(innerBlock).toBeDefined();
    expect(innerBlock.tagName.toLowerCase()).toBe("blockquote");
    expect(innerBlock.innerHTML).toBe(`<${PARAGRAPH_HTML_TAG}>${helloContent}</${PARAGRAPH_HTML_TAG}>`);
  });
});
