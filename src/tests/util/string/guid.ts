import { it } from 'vitest';
import { uuidv4 } from '../../../util/string/Guid';

it.concurrent("should generate uuidv4", ({ expect }) => {
  const result = uuidv4();
  expect(result).toBeDefined();
  expect(typeof result).toBe("string");
  expect(result.length).toBe(36);
});