export default function addStyleValue(state, style, component) {
  // const newStyle = Object.assign({}, state.components[component].props.style, style);
  const components = { ...state.components};
  const newComponent = components[component] = { ...components[component] };
  const newProps = newComponent.props = { ...newComponent.props };
  const newStyle = newProps.style = { ...newProps.style, ...style };
  return {
    ...state,
    components
  }
};
