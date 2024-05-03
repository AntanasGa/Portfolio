import { usePromiseSuspense } from "~/util/hooks";
import MarkdownSection from "./MarkdownSection"
import ProjectIdentity from "./ProjectIdentity"
import { TaggedContentItem } from "./types"
import { CONTENT } from "~/util/cdn/constants";
import RouterError from "~/util/router/RouterError";
import { useTranslation } from "react-i18next";
import { LANGUAGE_MAP } from "~/translations/config";
import { useMemo } from "react";
import ResourceExtensionRemover from "~/util/string/ResourceExtensionRemover";

interface ProjectWindowProps {
  project: TaggedContentItem;

}

export default function ProjectWindow({ project }: ProjectWindowProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const projectResource = useMemo(
    () => new URL(
      (( ResourceExtensionRemover(project.resource) ?? "./") + "/").replace(/\/{2,}/, "/"),
      CONTENT
    ),
    [project.resource]
  );

  const content = usePromiseSuspense(
    async () => {
      const localizedResource = new URL(`./${language}.md`, projectResource);

      const res = await fetch(localizedResource.toString());
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
      <div className="project-window__body">
        <MarkdownSection markdown={ content }
          config={{
            link: {
              baseUri: projectResource.toString(),
              navLink: {
                baseLink: `/${language}/`
              },
            }
          }}
        />
      </div>
    </div>
  );
}
