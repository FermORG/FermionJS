// @flow
export default function setActiveComponent(state: {}, component: string) {
  if (component === state.activeComponent) return state;
  const nextState = Object.assign({}, state);
  nextState.activeComponent = component;
  const { components } = nextState
  
  for (const key in components){
    if (components[key].props.style.border === '1px solid lightgreen'){
      components[key].props.style.border = null;
    }
  }
  nextState.components[component].props.style.border = '1px solid lightgreen';

  return nextState;
}
