export default function hexColorParser(input: string) {
  const defaultResponse = "";
  
  input = input.trim();
  if (typeof input !== "string" || !input.length) {
    return defaultResponse;
  }

  input = input.charAt(0) == "#" ? input.substring(1) : input;
  const chopCount = input.length === 6 ? 2 : input.length === 3 ? 1 : 0;

  if (chopCount < 1) {
    return defaultResponse;
  }

  const responseValues = new Array<number>();
  for (let indexer = 0; indexer < input.length; indexer += chopCount) {
    let subset = input.substring(indexer, indexer + chopCount);
    subset += chopCount === 1 ? subset : "";
    
    const extracted = Number("0x" + subset);
    if (isNaN(extracted)) {
      return defaultResponse;
    }

    responseValues.push(extracted);
  }

  return responseValues.join(", ");
}
