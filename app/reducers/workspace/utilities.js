export default function cloneComponentAndChildren(component) {
  const newComponent = { ...component };
  newComponent.children = newComponent.children.slice(0);
  return newComponent;
}
