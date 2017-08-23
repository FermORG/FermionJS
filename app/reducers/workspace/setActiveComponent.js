// @flow
export default function setActiveComponent(state: {}, component: string) {
  if (component === state.activeComponent) return state;

  const nextState = { ...state };
  const { components } = nextState;
  nextState.components = components;

  components[nextState.activeComponent] = { ...components[nextState.activeComponent] };
  delete components[nextState.activeComponent].props.style.border; 
  nextState.activeComponent = component;
  nextState.components[component].props.style.border = '1px solid lightgreen';

  return nextState;
}
