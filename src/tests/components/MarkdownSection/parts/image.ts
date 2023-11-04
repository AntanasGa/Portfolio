import { it } from 'vitest';
import { getRender } from '../helpers/index';
import { firstOrUndefinedOf } from '../../../../util/array/Selector';

const helloContent = "hello";
it.concurrent("Should have image with /hello.png as src", ({ expect }) => {
  const path = `/${helloContent}.png`;
  const { testId, render } = getRender(`![${helloContent}](${path})`);
  const section = render.getByTestId(testId);
  
  const imageList = Array.from(section.querySelectorAll("img") ?? []);
  

  expect(section).toBeDefined();
  expect(Array.from(section.children).length).toBe(1);
  
  expect(imageList.length).toBe(1);
  
  const theImage = firstOrUndefinedOf(imageList);
  expect(theImage).toBeDefined();
  expect(theImage?.attributes.getNamedItem("src")?.value).toBe(path);
  expect(theImage?.alt).toBe(helloContent);
});
