export default function deleteStylesValue(state, key, component){
  const newState = Object.assign({}, state);
  const styles = newState.components[component].props.style;
  const newStyles = Object.assign({}, styles);
  delete newStyles[key];
  newState.components[component].props.style = newStyles;
  return newState;
};
