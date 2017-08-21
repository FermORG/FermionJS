export default function updateMethods(state, methods) {
  const nextState = Object.assign({}, state);
  nextState.methods = methods;
  return nextState;
}
