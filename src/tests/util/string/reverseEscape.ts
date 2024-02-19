import { it } from 'vitest';
import ReverseEscape from '~/util/string/ReverseEscape';

it.concurrent("should generate uuidv4", ({ expect }) => {
  const initial = "<script>";
  const result = ReverseEscape(initial.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"));
  expect(result).toBeDefined();
  expect(typeof result).toBe("string");
  expect(result).toBe(initial);
});
