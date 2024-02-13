import { useContext, useMemo } from 'react';
import { ManifestStateContext } from '../../reducers/manifest';
import GreetingSphere from '~/components/GreetingSphere';
import TerminalWindow from '~/components/TerminalWindow';

function Locale$Index() {
  const manifestState = useContext(ManifestStateContext);
  const tags = useMemo(() => Object.entries(manifestState.tags).sort(([a], [b]) => (+a) - (+b))/*.filter(([_, v]) => v.tagged)*/, [ manifestState ]);
  // background: `radial-gradient(circle at 47% 53%, transparent 65%, white 100%), radial-gradient(circle at 60% 40%, transparent 10%, purple 60%, transparent 20%)`,
  
  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "start", width: "100vw", marginBottom: "2rem" }}>
      <GreetingSphere />
    </div>
    <div>
      <TerminalWindow />
    </div>
    </>
  )
}

export default Locale$Index;
