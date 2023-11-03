import { useMemo } from "react";
import MdParser from "../util/MdParser";

function MarkdownSection({ markdown, testId }: { markdown: string, testId?: string }) {
  const items = useMemo(() => {
    // const start = performance.now(); 
    const parsed = MdParser(markdown);
    // const end = performance.now();
    // console.log(end - start);
    return parsed;
  }, [markdown]);
  return (
    <section style={{ width: "100vw" }} data-testid={testId}>{ items }</section>
  );
}

export default MarkdownSection
