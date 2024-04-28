import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GreetingSphere from '~/components/GreetingSphere';
import TerminalWindow from '~/components/TerminalWindow';
import { StarBackgroundReducerContext } from '~/reducers/starbackground';
import { LANGUAGE_MAP } from '~/translations/config';
import setTitle from '~/util/dom/titleSetter';

function Locale$Index() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);
  const { t, i18n } = useTranslation("pages", { keyPrefix: "index" });
  const language = i18n.language as keyof typeof LANGUAGE_MAP;

  useEffect(
    () => {
      starBackgroundSetter?.set({ x: 15, y: 15 })
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
    <>
    <div className="place--center w-screen mb-16">
      <GreetingSphere />
    </div>
    <div className="container-lg container-place--right">
      <TerminalWindow />
    </div>
    </>
  )
}

export default Locale$Index;
