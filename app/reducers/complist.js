// @flow
// complist reducers
import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../actions/complist';
import getComponentLibrary from '../components/VisComponents/dataExporter';

type actionType = {+type: string,
};

const defaultData = getComponentLibrary();

// fs
//   .readdirSync('app/components/VisComponents/')
//   .filter(file => path.extname(file) === '.jsx')

export default function listReducer(state: {} = defaultData, action: actionType) {
  const newState = Object.assign({}, state);
  // newState.availableComponents =JSON.parse(JSON.stringify(newState.availableComponents));
  switch (action.type) {
    case ADD_COMPONENTS:
      return newState.availableComponents.concat(action.components);
    case ADD_TO_PROJECT:
      return newState;
    default:
      return newState;
  }
}
