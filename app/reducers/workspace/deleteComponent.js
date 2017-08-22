import { WORKSPACE_ID } from '../../constants';

export default function deleteComponent(state, action) {
  if (action.id === WORKSPACE_ID) return state;

  const components = { ...state.components };
  const deleteTarget = components[action.id];
  const parent = { ...components[deleteTarget.parentID] };

  delete components[deleteTarget.id];
  components[parent.id] = parent;  
  parent.children = parent.children.filter(id => id  !== deleteTarget.id);
  
  
  return {
    ...state,
    activeComponent: WORKSPACE_ID,
    components
  }
}
