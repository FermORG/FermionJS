export default function updateStyle(state, action) {
  const components = { ...state.components };
  const componentToChange = components[action.sourceID] = { ...components[action.sourceID] };
  const props = componentToChange.props = { ...componentToChange.props };
  const newStyle = props.style = { ...props.style, ...action.newStyle };

  return {
    ...state,
    components
  };
}
