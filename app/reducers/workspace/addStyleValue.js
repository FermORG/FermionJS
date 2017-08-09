export default function addStyleValue(state, style, component){
  const newStyle = Object.assign({}, state.components[component].props.style, style);
  const newState = Object.assign({}, state);
  newState.components[component].props.style = newStyle;
  return newState;
};
