import { describe, it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

describe("code", () => {
  const helloContent = "hello";
  it.concurrent("Should have code with hello", ({ expect }) => {
    const { testId, render } = getRender(`\`\`\`
${helloContent}
\`\`\``);
    const section = render.getByTestId(testId);
    
    const codeSpanList = Array.from(section.querySelectorAll("code") ?? []);
    

    expect(section).toBeDefined();
    expect(Array.from(section.children).length).toBe(1);
    
    expect(codeSpanList.length).toBe(1);
    expect(firstOrUndefinedOf(codeSpanList)?.innerHTML).toBe(`${helloContent}`);
  });
});
