import { useContext, useEffect } from 'react';
import GreetingSphere from '~/components/GreetingSphere';
import TerminalWindow from '~/components/TerminalWindow';
import { StarBackgroundReducerContext } from '~/reducers/starbackground';

function Locale$Index() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);

  useEffect(() => {
    starBackgroundSetter?.set({ x: 15, y: 15 })
  }, [starBackgroundSetter]);
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
