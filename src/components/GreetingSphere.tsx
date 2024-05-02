import { HOST } from '~/util/cdn/constants';

function GreetingSphere() {
  return (
    <div className="greeting-sphere">
      <img src={ new URL("typing.webp", HOST).toString() } width={ 300 } />
    </div>
  );
}

export default GreetingSphere;
