import { useMemo } from "react";
import MdParser from "../util/MdParser";

function MarkdownSection({ markdown, testId }: { markdown: string, testId?: string }) {
  const items = useMemo(() => MdParser(markdown), [markdown]);
  return (
    <section style={{ width: "100vw" }} data-testid={testId}>{ items }</section>
  );
}

export default MarkdownSection
