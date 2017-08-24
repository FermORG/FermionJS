// @flow
// complist reducers
import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../actions/complist';
import getComponentLibrary from '../component-library/componentExporter';

type actionType = {+type: string,
};

const defaultData = getComponentLibrary();

export default function listReducer(state: {} = defaultData, action: actionType) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_COMPONENTS:
      return newState.availableComponents.concat(action.components);
    case ADD_TO_PROJECT:
      return newState;
    default:
      return newState;
  }
}
