//@flow
//complist actions.


// import type { addComponentsStateType } from '../reducers/complist';

// type actionType = {
//   +type: string,
// };

export const ADD_COMPONENTS = 'ADD_COMPONENTS';

export const ADD_TO_PROJECT = 'ADD_TO_PROJECT';

export function AddComponents(components) {
  return {
    type: 'ADD_COMPONENTS',
    components
  };
}

export function AddToProject(component) {
  return {
    type: 'ADD_TO_PROJECT',
    component
  };
}
