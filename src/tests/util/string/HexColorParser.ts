import { it } from 'vitest';
import hexColorParser from '~/util/string/HexColorParser';

it.concurrent("should generate rgb value with #", ({ expect }) => {
  const result = hexColorParser("#FFFFFF");
  expect(result).toBeDefined();
  expect(typeof result).toBe("string");
  expect(result).toBe("255, 255, 255");
});

it.concurrent("should generate rgb value without #", ({ expect }) => {
    const result = hexColorParser("FFFFFF");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toBe("255, 255, 255");
});

it.concurrent("should generate rgb value with 3 symbols", ({ expect }) => {
    const result = hexColorParser("FFF");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toBe("255, 255, 255");
});

it.concurrent("should not generate rgb value with incorrect character count", ({ expect }) => {
    const result = hexColorParser("FFFA");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toBe("");
});

it.concurrent("should not generate rgb value with incorrect characters", ({ expect }) => {
    const result = hexColorParser("FXFXFA");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toBe("");
});
