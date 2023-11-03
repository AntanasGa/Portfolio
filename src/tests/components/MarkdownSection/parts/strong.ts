import { describe, it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("strong", () => {
  const helloContent = "hello";
  it.concurrent("Should have strong wrapping hello", ({ expect }) => {
    const { testId, render } = getRender(`**${helloContent}**`);
    const section = render.getByTestId(testId);
    
    const strongElementList = Array.from(section.querySelectorAll("strong") ?? []);

    expect(section).toBeDefined();
    
    expect(strongElementList.length).toBe(1);
    expect(firstOrUndefinedOf(strongElementList)?.innerHTML).toBe(helloContent);
  });
});
