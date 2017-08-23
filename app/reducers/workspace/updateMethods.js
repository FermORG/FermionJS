export default function updateMethods(state, methods) {
  const nextState = Object.assign({}, state);
  nextState.methods = removeNote(methods);
  nextState.methodNames = methodNames(methods);
  return nextState;
}


function removeNote(methods) {
  return methods.split('/*Anything you type in here will be appended to App.js as a \n method. you can then attach them as event handlers, logic handlers, etc.*/').join('');
}

function methodNames(methods) {
  const methodArray = methods.split('}@\n');
  const methodNames = methodArray.map((method) => {
    let end = method.match(/\((.+)\)/);
    if (end) return method.slice(0, end.index).trim();
    else end = method.indexOf('()');
    return method.slice(0, end).trim();
  });
  if (methodNames[methodNames.length - 1] === '') methodNames.pop();
  return methodNames;
}
