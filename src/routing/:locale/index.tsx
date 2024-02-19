import GreetingSphere from '~/components/GreetingSphere';
import TerminalWindow from '~/components/TerminalWindow';

function Locale$Index() {
  return (
    <>
    <div className="place--center w-screen mb-16">
      <GreetingSphere />
    </div>
    <div className="container-xl container-place--right">
      <TerminalWindow />
    </div>
    </>
  )
}

export default Locale$Index;
