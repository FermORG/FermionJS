export default function addStateValue(state, aStateValue) {
  const newState = Object.assign({}, state);
  const newAppState = Object.assign({}, newState.state, aStateValue);
  newState.state = newAppState;
  return newState;
}
