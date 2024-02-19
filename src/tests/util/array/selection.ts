
import { describe, it } from 'vitest';
import { firstOrUndefinedOf, nthOrUndefinedOf } from '~/util/array/Selector';

describe("nthOrUndefinedOf", () => {
  it.concurrent("should work with empty array", ({ expect }) => {
    const selectionList = new Array<unknown>();
    expect(nthOrUndefinedOf(selectionList)).toBe(undefined);
  });
  
  it.concurrent("should work with undefined", ({ expect }) => {
    expect(nthOrUndefinedOf(undefined)).toBe(undefined);
  });
  
  it.concurrent("should work with null", ({ expect })=> {
    expect(nthOrUndefinedOf(null)).toBe(undefined);
  });

  it.concurrent("should work with filled array", ({ expect }) => {
    const testingArray = [1];
    expect(nthOrUndefinedOf(testingArray)).toBe(testingArray[0])
  });

  it.concurrent("should work with filled array and provided index", ({ expect }) => {
    const testArray = [1, 2, 3, 4];
    const selectedIndex = 3;
    expect(nthOrUndefinedOf(testArray, selectedIndex)).toBe(testArray[selectedIndex])
  });

  it.concurrent("should work with filled array and provided negative index", ({ expect }) => {
    const testArray = [1, 2, 3, 4];
    const selectedIndex = -1;
    const expectedIndex = testArray.length + selectedIndex;
    expect(nthOrUndefinedOf(testArray, selectedIndex)).toBe(testArray[expectedIndex]);
  });
});

describe("FirstOrUndefined", () => {
  it.concurrent("should work with empty array", ({ expect }) => {
    const selectionList = new Array<unknown>();
    expect(firstOrUndefinedOf(selectionList)).toBe(undefined);
  });
  
  it.concurrent("should work with undefined", ({ expect }) => {
    expect(firstOrUndefinedOf(undefined)).toBe(undefined);
  });
  
  it.concurrent("should work with null", ({ expect })=> {
    expect(firstOrUndefinedOf(null)).toBe(undefined);
  });

  it.concurrent("should work with filled array", ({ expect }) => {
    const testingArray = [1];
    expect(firstOrUndefinedOf(testingArray)).toBe(testingArray[0])
  });
});
