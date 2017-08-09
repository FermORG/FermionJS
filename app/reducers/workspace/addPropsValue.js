export default function addPropsValue(state, prop, component){
  if (Object.keys(prop)[0] === 'style' || Object.keys(prop)[0] === 'styles') return state;
  const newProps = Object.assign({}, state.components[component].props, prop);
  const newState = Object.assign({}, state);
  newState.components[component].props = newProps;
  return newState;
};
