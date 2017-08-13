export default function deletePropsValue(state, key, component) {
  if (key === 'style' || key === 'styles') return state;
  const newState = Object.assign({}, state);
  const props = newState.components[component].props;
  const newProps = Object.assign({}, props);
  delete newProps[key];
  newState.components[component].props = newProps;
  return newState;
}
