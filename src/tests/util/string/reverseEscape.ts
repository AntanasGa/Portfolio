import { describe, it } from 'vitest';
import ReverseEscape from '../../../util/string/ReverseEscape';


describe("util", () => {
  describe("string", () => {
    describe("reverseEscape", () => {
      it.concurrent("should generate uuidv4", ({ expect }) => {
        const initial = "<script>";
        const result = ReverseEscape(initial.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"));
        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
        expect(result).toBe(initial);
      });
    });
  });
});