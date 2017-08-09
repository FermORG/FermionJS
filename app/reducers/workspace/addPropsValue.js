export default function addPropsValue(state, prop, component){
  if (Object.keys(prop)[0] === 'style' || Object.keys(prop)[0] === 'styles') return state;
  const newProps = Object.assign({}, state.components[component].props, prop);
  const newState = Object.assign({}, state);
  newState.components[component].props = newProps;
  // console.log('newState: ', JSON.stringify(state));
  // const newAppState = Object.assign({}, newState.state, aStateValue);
  // newState.state = newAppState;
  // console.log('newState.state: ', JSON.stringify(newState.state));
  // console.log(state, prop);
  // console.log(component);
  return newState;
};
