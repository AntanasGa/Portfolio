import shallowArrayEqual from "~/util/array/ShallowArrayEqual";
import { it } from "vitest";

it('should return true for equal arrays', ({ expect }) => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(shallowArrayEqual(arr1, arr2)).toBe(true);
});

it('should return false for different arrays', ({ expect }) => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 4];
  expect(shallowArrayEqual(arr1, arr2)).toBe(false);
});

it('should return false for arrays with different lengths', ({ expect }) => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3, 4];
  expect(shallowArrayEqual(arr1, arr2)).toBe(false);
});

it('should return true for empty arrays', ({ expect }) => {
  const arr1 = new Array<number>();
  const arr2 = new Array<number>();
  expect(shallowArrayEqual(arr1, arr2)).toBe(true);
});

