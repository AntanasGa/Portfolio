import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import MarkdownSection from "~/components/MarkdownSection";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";
import { LANGUAGE_MAP } from "~/translations/config";
import setTitle from "~/util/dom/titleSetter";

function Locale$FeatureTest() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);
  const { t, i18n } = useTranslation("pages", { keyPrefix: "testPage" });
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  const [ textareaValue, setTextareaValue ] = useState("");

  useEffect(
    () => {
      starBackgroundSetter?.set({ x: 0, y: 0 });
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
      <div className="container-xl projects-window projects-resource blur">
        <div className="terminal__header">
          <div></div>
          <div className="terminal__path">{t("routeName")}</div>
          <div className="terminal__actions">
            <NavLink to={ `/${language}/projects` } className="terminal__button" title={ t("returnButton")} />
          </div>
        </div>
        <div className="project-window test-area">
          <textarea onChange={(e) => setTextareaValue(e.currentTarget.value)}></textarea>
          <MarkdownSection markdown={ textareaValue }
            config={{
              html: {
                allowedTags: []
              },
              link: {
                navLink: {
                  disableNavLink: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Locale$FeatureTest;
