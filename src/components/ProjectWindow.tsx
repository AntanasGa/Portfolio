import { usePromiseSuspense } from "~/util/hooks";
import MarkdownSection from "./MarkdownSection"
import ProjectIdentity from "./ProjectIdentity"
import { TaggedContentItem } from "./types"
import { CONTENT } from "~/util/cdn/constants";
import RouterError from "~/util/router/RouterError";
import { useTranslation } from "react-i18next";
import { LANGUAGE_MAP } from "~/translations/config";

interface ProjectWindowProps {
  project: TaggedContentItem;

}

export default function ProjectWindow({ project }: ProjectWindowProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const content = usePromiseSuspense(
    async () => {
      const res = await fetch(new URL(project.resource ?? "", CONTENT).toString());
      if (res.status !== 200) {
        throw new RouterError("Route not found", 404);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("text/markdown")) {
        throw new Error("Invalid content type");
      }
      return await res.text();
    },
    [project.resource, language]
  );

  return (
    <div className="project-window">
      <div className="project-window__header">
          <ProjectIdentity project={ project } disableHover />
      </div>
      <MarkdownSection markdown={ content } />
    </div>
  );
}
