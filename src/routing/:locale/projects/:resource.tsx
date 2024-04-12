import { Suspense, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import LoaderFallback from "~/components/LoaderFallback";
import ProjectWindow from "~/components/ProjectWindow";
import { TaggedContentItem } from "~/components/types";
import { ManifestStateContext } from "~/reducers/manifest";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";
import { LANGUAGE_MAP } from "~/translations/config";
import { firstOrUndefinedOf } from "~/util/array/Selector";

export default function Projects$Resource() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);
  const manifestState = useContext(ManifestStateContext);
  const { resource } = useParams();
  const { t, i18n } = useTranslation("pages", { keyPrefix: "projects" });
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const project = useMemo(
    () =>
      firstOrUndefinedOf(
        manifestState.content.filter(x => x.resource === resource)
          .map<TaggedContentItem>(x => ({...x, tags: x.tags.map(x => manifestState.tags[x])}))
      )
    ,
    [manifestState, resource]
  );


  useEffect(
    () => {
      starBackgroundSetter?.set({ x: -15, y: 0 });
    },
    [starBackgroundSetter]
  );
  
  return (
    <div className="w-screen">
      <div className="container-xl projects-window projects-resource">
        <div className="terminal__header">
          <div></div>
          <div className="terminal__path">{ project?.name[language] ?? "" }</div>
          <div className="terminal__actions">
            <NavLink to={ `/${language}/projects` } className="terminal__button" title={ t("returnButton")} />
          </div>
        </div>
        { project
            ?
            (
              <Suspense fallback={ <LoaderFallback /> }>
                <ProjectWindow project={ project } />
              </Suspense>
            )
            : null
        }
      </div>
    </div>
  );
}
