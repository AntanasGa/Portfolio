import { describe, it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("link", () => {
  const helloContent = "hello";
  it.concurrent("Should have anchor with /hello path", ({ expect }) => {
    const path = `/${helloContent}`;
    const { testId, render } = getRender(`[${helloContent}](${path})`);
    const section = render.getByTestId(testId);
    
    const imageList = Array.from(section.querySelectorAll("a") ?? []);
    

    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(imageList.length).toBe(1);
    
    const theImage = firstOrUndefinedOf(imageList);
    expect(theImage).toBeDefined();
    expect(theImage?.attributes.getNamedItem("href")?.value).toBe(path);
    expect(theImage?.innerHTML).toBe(helloContent);
  });
});
