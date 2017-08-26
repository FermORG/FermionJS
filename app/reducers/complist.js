// @flow
// complist reducers
import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../actions/complist';
import getComponentLibrary from '../component-library/componentLoader';

type actionType = {+type: string,
};

const setRequiredComponentProperties = (componentList) => {
  const requiredProperties = { events: {}, children: [] };

  return componentList.map(componentData => {
    const { name, jsx, style } = componentData;

    return {
      ...requiredProperties,
      props: { style },
      name,
      jsx
    };
  });
};

const componentLibrary = getComponentLibrary();
const defaultData = setRequiredComponentProperties(componentLibrary);

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
