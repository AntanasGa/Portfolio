import { it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '~/util/array/Selector';

const helloContent = "hello";
it.concurrent("Should have code with hello", ({ expect }) => {
  const { testId, render } = getRender(`\`\`\`
${helloContent}
\`\`\``
  );

  const section = render.getByTestId(testId);
  
  const codeSpanList = Array.from(section.querySelectorAll("div.code") ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(codeSpanList.length).toBe(1);
  const firstCodeSpan = firstOrUndefinedOf(codeSpanList);
  const codePre = Array.from(firstCodeSpan?.querySelectorAll("pre") ?? []);
  expect(codePre.length).toBe(1);
  expect(firstOrUndefinedOf(codePre)?.innerHTML).toBe(`${helloContent}`);
});

it.concurrent("Should have code with hello and lang", ({ expect }) => {
  const lang = "ts";
  const { testId, render } = getRender(`\`\`\`${lang}
${helloContent}
\`\`\``
  );

  const section = render.getByTestId(testId);
  
  const codeSpanList = Array.from(section.querySelectorAll("div.code") ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(codeSpanList.length).toBe(1);

  const firstCodeSpan = firstOrUndefinedOf(codeSpanList);
  
  const langDiv = Array.from(firstCodeSpan?.querySelectorAll("div") ?? []);
  expect(langDiv.length).toBe(1);
  expect(firstOrUndefinedOf(langDiv)?.innerHTML).toBe(lang);

  const codePre = Array.from(firstCodeSpan?.querySelectorAll("pre") ?? []);
  expect(codePre.length).toBe(1);

  expect(firstOrUndefinedOf(codePre)?.innerHTML).toBe(`${helloContent}`);
});
