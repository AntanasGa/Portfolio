const hasNoParameter = <P, R>(fn: ((argument: P) => R) | (() => R)): fn is (() => R) => {
  return !fn.length;
}

export default hasNoParameter;
