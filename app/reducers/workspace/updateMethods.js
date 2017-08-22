export default function updateMethods(state, methods) {
  const nextState = Object.assign({}, state);
  nextState.methods = methods;
  nextState.methodNames = methodNames(methods);
  return nextState;
}


function methodNames(methods) {
  const methodArray = methods.split('}@\n');
  const methodNames = methodArray.map((method) => {
    const end = method.indexOf('()');
    return method.slice(0, end).trim();
  });
  methodNames.pop();
  return methodNames;
}
