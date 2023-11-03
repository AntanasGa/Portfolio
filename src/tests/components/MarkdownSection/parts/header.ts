import { describe, it } from 'vitest';
import { getRender, PARAGRAPH_HTML_TAG } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("header", () => {
  const helloContent = "hello";
  it.concurrent("Should be h1 hello", ({ expect }) => {
    const { testId, render } = getRender(`# ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h1") ?? []);
    

    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should be h2 hello", ({ expect }) => {
    const { testId, render } = getRender(`## ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h2") ?? []);
    
    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should be h3 hello", ({ expect }) => {
    const { testId, render } = getRender(`### ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h3") ?? []);
    
    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should be h4 hello", ({ expect }) => {
    const { testId, render } = getRender(`#### ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h4") ?? []);
    
    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should be h5 hello", ({ expect }) => {
    const { testId, render } = getRender(`##### ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h5") ?? []);
    
    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should be h6 hello", ({ expect }) => {
    const { testId, render } = getRender(`###### ${helloContent}`);
    const section = render.getByTestId(testId);
    
    const headerList = Array.from(section.querySelectorAll("h6") ?? []);
    
    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(headerList.length).toBe(1);
    expect(firstOrUndefinedOf(headerList)?.innerHTML).toBe(helloContent);
  });

  it.concurrent("Should not have h7 hello", ({ expect }) => {
    const mdContent = `####### ${helloContent}`;
    const { testId, render } = getRender(mdContent);
    const section = render.getByTestId(testId);

    expect(section).toBeDefined();
    expect(Array.from(section.children ?? []).length).toBe(1);
    expect(section.innerHTML).toBe(`<${PARAGRAPH_HTML_TAG}>${mdContent}</${PARAGRAPH_HTML_TAG}>`);
  });
});
