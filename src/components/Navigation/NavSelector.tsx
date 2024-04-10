import { NavLink, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPath } from "~/util/hooks";
import { DownIcon, PersonBadgeIcon, StackIcon } from "~/components/Icons";

enum NavState {
  Hidden = 0,
  TransitionAuto = 1,
  TransitionManual = 2,
  Visible = 3
}

const navTransition = {
  [NavState.Hidden]: NavState.Hidden,
  [NavState.TransitionAuto]: NavState.Hidden,
  [NavState.TransitionManual]: NavState.TransitionManual,
  [NavState.Visible]: NavState.Visible,
};

export default function NavSelector() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const navElement = useRef<HTMLLIElement>(null);
  const navBar = useRef<HTMLElement>(null);
  const lastRoute = useRef<string | null>(null);
  
  const currentRoute = useMemo(() => ({["/" + (pathname.substring(1).split("/")[1] ?? "")]: true}), [pathname]);
  
  const [ navState, setNavState ] = useState(NavState.TransitionAuto);
  const [ scrollOffset, setScrollOffset ] = useState(0);
  const [ navBarHeight, setNavBarHeight ] = useState(0);
  const [ navWidth, setNavWidth ] = useState(0);
  const [ elHeight, setElHeight ] = useState(0);

  useEffect(
    () => {
      const onResize = () => {
        // scrollOffset is always negative, thus subtraction
        setNavBarHeight((navBar.current?.scrollHeight ?? 0) - scrollOffset);
        setElHeight(navElement.current?.scrollHeight ?? 0);
        setNavWidth(navBar.current?.scrollWidth ?? 0);
      };

      window.addEventListener("resize", onResize);
      onResize();
      setScrollOffset(0 - (navBar.current?.querySelector<HTMLLIElement>("li.active")?.offsetTop ?? 0));
      
      return () => window.removeEventListener("resize", onResize);
    },
    [scrollOffset]
  );

  useEffect(
    () => {
      // prevents double settting / resetting offset to 0
      const selectedRoute = Object.keys(currentRoute)[0];
      if (lastRoute.current === selectedRoute) {
        return;
      }
      lastRoute.current = selectedRoute;

      setScrollOffset(0 - (navBar.current?.querySelector<HTMLLIElement>("li.active")?.offsetTop ?? 0));
    },
    [currentRoute]
  );

  return (
    <nav style={{
        maxHeight: navState !== NavState.Visible ? `${elHeight}px` : `${navBarHeight}px`,
        maxWidth: navState !== NavState.Hidden ? `${navWidth}px` : elHeight ? `${elHeight}px` : "auto",
        borderRadius: navState === NavState.Hidden ? `${elHeight}px` : undefined,
      }}
      onTransitionEnd={ () => setTimeout(() => setNavState((s) => navTransition[s]), 750) }
      // sometimes on keyboard input the scroll happens horisontally, this is undesired
      onScroll={ (e) => e.currentTarget.scrollLeft = 0 }
      ref={ navBar }
    >
      <div className="navWrapper">
        { navState < 3 &&
          <button type="button"
            className="opener"
            tabIndex={-1}
            title={ t("shared:uiExpand") }
            onClick={ () => setNavState(NavState.Visible) }
            onMouseEnter={ () => setNavState(NavState.TransitionManual) }
            onMouseLeave={ () => setNavState(NavState.Hidden) }
          ></button>
        }
        <ul style={{
            transitionDelay: NavState.Visible !== navState ? "0.15s" : "0s",
            // additional offset corrects the component centering
            marginTop: navState < 3 && scrollOffset < -1 ? `${scrollOffset + 0.5}px` : undefined
          }}
          onFocus={ () => setNavState(NavState.Visible) }
        >
          <li ref={ navElement } className={ currentRoute["/"] ? "active" : "" }>
            <NavLink to={ getPath(i18n, "") } onClick={ () => setNavState(NavState.TransitionAuto) }>
              <PersonBadgeIcon />
              { t("pages:index.routeName") }
            </NavLink>
          </li>
          <li className={ currentRoute["/projects"] ? "active" : "" }>
            <NavLink to={ getPath(i18n, "projects") } onClick={ () => setNavState(NavState.TransitionAuto) }>
              <StackIcon />
              { t("pages:projects.routeName") }
            </NavLink>
          </li>
          <li className="no-hover">
            <LanguageSelector />
          </li>
          <li>
            <button type="button"
              disabled={ navState === NavState.Hidden }
              title={ t("shared:uiColapse") }
              onClick={ () => (navState > NavState.Hidden && setNavState(NavState.TransitionAuto)) }
            >
              <DownIcon />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
