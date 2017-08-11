export default function deletePropsValue(state, key, component){
  console.log('state ,' ,state);
  console.log('key, ', key);
  console.log('comp: ,' ,component);
  if (key === 'style' || key === 'styles') return state;
  const newState = Object.assign({}, state);
  const props = newState.components[component].props;
  const newProps = Object.assign({}, props);
  delete newProps[key];
  newState.components[component].props = newProps;
  return newState;
};
