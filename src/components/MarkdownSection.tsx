import { useMemo } from "react";
import MdParser from "../util/MdParser";
import { ConfigContext } from "../util/MdParser/types";

function MarkdownSection({ markdown, config, testId }: { markdown: string, config?: ConfigContext, testId?: string }) {
  const items = useMemo(() => MdParser(markdown, config), [markdown, config]);
  return (
    <section style={{ width: "100vw" }} data-testid={testId}>{ items }</section>
  );
}

export default MarkdownSection
