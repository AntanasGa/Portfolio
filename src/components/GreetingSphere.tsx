import React from 'react';
import { HOST } from '~/util/cdn/constants';

function GreetingSphere() {
  return (
    <div className="greeting-sphere">
      <img src={ new URL("typing.png", HOST).toString() } />
    </div>
  );
}

export default GreetingSphere;
