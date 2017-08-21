import { cloneDeep } from 'lodash';

export default function addStyleValue(state, style, component) {
  const components = { ...state.components };
  const newComponent = components[component] = { ...components[component] };
  const newProps = newComponent.props = { ...newComponent.props };
  const newStyle = newProps.style = { ...cloneDeep(newProps.style), ...style };
  return {
    ...state,
    components
  };
}
