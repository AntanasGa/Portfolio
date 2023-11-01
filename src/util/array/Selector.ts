
export const firstOrUndefinedOf = function <T>(arr: T[] | undefined | null): T | undefined {
  return nthOrUndefinedOf(arr);
}

export const nthOrUndefinedOf = function <T>(arr: T[] | undefined | null, index: number = 0): T | undefined {
  if (!Number.isFinite(index)) {
    return undefined;
  }
  if (index < 0) {
    return undefined;
  }
  return arr?.[index] ?? undefined;
}