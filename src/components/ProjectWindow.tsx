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
      const resource = (project.resource ?? "") + `/${language}.md`;

      const res = await fetch(new URL(resource, CONTENT).toString());
      const contentType = res.headers.get("content-type");
      if (res.status !== 200 || !contentType || !contentType.includes("text/markdown")) {
        throw new RouterError("Route not found", 404);
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
