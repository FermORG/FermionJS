// @flow
export default function setActiveComponent(state: {}, component: string) {
  if (component === state.activeComponent) return state;
  const nextState = Object.assign({}, state);
  nextState.activeComponent = component;
  return nextState;
}
