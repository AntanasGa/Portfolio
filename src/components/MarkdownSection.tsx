import { useMemo } from "react";
import MdParser from "~/util/MdParser";
import { ConfigContext } from "~/util/MdParser/types";
import { ITestableComponent } from "./types";

interface MarkdownSectionProps extends ITestableComponent {
  markdown: string;
  config?: ConfigContext;
}

function MarkdownSection({ markdown, config, testId }: MarkdownSectionProps) {
  const items = useMemo(() => MdParser(markdown, config), [markdown, config]);
  return (
    <section data-testid={testId}>{ items }</section>
  );
}

export default MarkdownSection;
