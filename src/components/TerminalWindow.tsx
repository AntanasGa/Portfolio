import { AnimationEvent, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ManifestStateContext } from '~/reducers/manifest';

function TerminalWindow() {
  const { t } = useTranslation("pages", { keyPrefix: "index" });
  const [visable, setVisable] = useState(false);

  const manifestState = useContext(ManifestStateContext);
  const tags = useMemo(() => Object.entries(manifestState.tags).sort(([a], [b]) => (+a) - (+b)).filter(([_, v]) => v.type === "tech"), [ manifestState ]);


  const [currentIndex, setCurrentIndex] = useState(0);
  const commands = useMemo(() => ["devfetch"], []);
  
  const [symbolIndex, setSymbolIndex] = useState(0);

  useEffect(
    () => {
      if (!visable) {
        return;
      }

      const timer = setTimeout(
        () => {
          if (symbolIndex <= commands[currentIndex]?.length) {
            setSymbolIndex(symbolIndex + 1);
            return;
          }

          if (currentIndex < commands.length) {
            setCurrentIndex(currentIndex + 1);
            setSymbolIndex(0);
            return;
          }

          clearInterval(timer);
        },
        65
      );

      return () => {
        clearInterval(timer);
      };
    },
    [visable, currentIndex, commands, symbolIndex]
  );

  const onAnimationEnd = useCallback(
    (e: AnimationEvent<HTMLDivElement>) => {
      if (e.animationName === "stall") {
        return;
      }

      setVisable(true);
    },
    [setVisable]
  );

  return (
    <div className="terminal" onAnimationEnd={onAnimationEnd}>
      <div className="terminal__header">
        <div></div>
        <div className="terminal__path">AntanasGa@portfolio: ~/Portfolio</div>
        <div className="terminal__actions">
          <div className="terminal__button"></div>
        </div>
      </div>
      <div className="terminal__body">
        <p className={ ["input", "typing", currentIndex === 0 ? "active" : ""].filter(x => x).join(" ")}>{ currentIndex !== 0 ? commands[0] : commands[0].substring(0, symbolIndex) }</p>
        { currentIndex > 0 &&
          <>
            <p>
              <span className="terminal__body--accent" >AntanasGa</span>
              @
              <span className="terminal__body--accent">portfolio</span>
              <br />
              <span>-------------------</span>
              <br />
              <span className="terminal__body--accent">{ t("name") }</span>
              <span>: Antanas Ga</span>
              <br />
              <span className="terminal__body--accent">{ t("technologies") }</span>
              :
              <br />
              { tags.map(([_, tag]) =>
                <Fragment key={ tag.name }>
                  <span style={{ color: tag.background, marginLeft: "2rem" }}>
                    { tag.href
                      ? <a href={ tag.href } target="_blank" rel="noreferrer noopener" style={{ color: tag.background }}>{ tag.name }</a>
                      : tag.name
                    }
                  </span>
                  <br />
                </Fragment>
              )}
              <span className="terminal__body--accent">{ t("developingSince") }</span>
              <span>: 2018</span>
              <br />
              <span className="terminal__body--accent">LinkedIn</span>
              <span>
                :
                <span> </span>
                <a href="https://www.linkedin.com/in/antanas-gargasas-993a4917a/" target="_blank" rel="noreferrer noopener">linkedin.com/in/antanas[...]</a>
              </span>
              <br />
              <span className="terminal__body--accent">GitHub</span>
              <span>
                :
                <span> </span>
                <a href="https://github.com/AntanasGa" target="_blank" rel="noreferrer noopener">github.com/AntanasGa</a>
              </span>
            </p>
            <p className={ ["input", currentIndex === 1 ? "active" : ""].filter(x => x).join(" ")}></p>
          </>
        }
        <p></p>
      </div>
    </div>
  );
}

export default TerminalWindow;
