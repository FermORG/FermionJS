export default function deleteStateValue(state, key) {
  const newState = Object.assign({}, state);
  const appState = Object.assign({}, newState.state);
  delete appState[key];
  newState.state = appState;
  return newState;
}
