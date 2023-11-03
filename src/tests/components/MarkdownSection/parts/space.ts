import { describe, it } from 'vitest';
import { getRender } from '../helpers/index';

describe("space", () => {
  const helloContent = "hello";
  it.concurrent("Should have space between the hello's", ({ expect }) => {
    const { testId, render } = getRender(`${helloContent}


${helloContent}`);
    const section = render.getByTestId(testId);
    
    const paragraphList = Array.from(section.querySelectorAll("br") ?? []);

    expect(section).toBeDefined();
    
    expect(paragraphList.length).toBe(1);
  });
});
