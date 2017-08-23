export default function updateMethods(state, methods) {
  const nextState = Object.assign({}, state);
  nextState.methods = methods;
  nextState.methodNames = methodNames(methods);
  return nextState;
}


function methodNames(methods) {
  const methodArray = methods.split('}@\n');
  const methodNames = methodArray.map((method) => {
    // const end = method.indexOf('()');
    let end = method.match(/\((.+)\)/);
    if (end) return method.slice(0, end.index).trim();
    else end = method.indexOf('()');
    return method.slice(0, end).trim();
    //return method.replace(/\((.+)\)/, '');
  });
  if (methodNames[methodNames.length - 1] === '') methodNames.pop();
  return methodNames;
}
