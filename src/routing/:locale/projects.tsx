import { i18n } from "i18next";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { StackIcon } from "~/components/Icons";
import ProjectIdentity from "~/components/ProjectIdentity";
import { ManifestStateContext } from "~/reducers/manifest";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";
import { LANGUAGE_MAP } from "~/translations/config";
import setTitle from "~/util/dom/titleSetter";
import random from "~/util/number/random";

function getResourceRoute<T extends { resource: string }>(locale: i18n, resource: T) {
  return `/${locale.language}/projects/${resource.resource}`;
}

function Locale$Projects() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);
  const manifestState = useContext(ManifestStateContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages", { keyPrefix: "projects" });
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const mappedContent = useMemo(
    () => manifestState.content.map((item) => ({...item, tags: item.tags.map(x => manifestState.tags[x])})),
    [manifestState]
  );

  const onRandom = useCallback(
    () => {
      navigate(getResourceRoute(i18n, mappedContent[random(0, manifestState.content.length)]));
    },
    [navigate, i18n, mappedContent, manifestState.content.length]
  );

  useEffect(
    () => {
      starBackgroundSetter?.set({ x: 15, y: -15 })
    },
    [starBackgroundSetter]
  );

  useEffect(
    () => {
      setTitle(t("routeName"));
    },
    [t, language]
  );

  return (
    <div className="w-screen">
      <main className="container-md projects-window blur">
        <div className="projects-window__header">
          <StackIcon />
          <h1>{ t("routeName") }</h1>
        </div>
        <ul className="projects-window__body">
          { mappedContent.map((item) => (
            <li key={ item.activeSince }>
              <NavLink to={ getResourceRoute(i18n, item) }>
                <ProjectIdentity project={ item } />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="projects-window__footer">
          <button onClick={ onRandom }>
            { t("randomButton") }
          </button>
        </div>
      </main>
    </div>
  );
}

export default Locale$Projects;
