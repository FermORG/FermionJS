// @flow
// complist reducers
import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../actions/complist';

type actionType = {
  +type: string,
};

const defaultData = {
  availableComponents: [
    {
      name: 'One',
      styles: {
        backgroundColor: 'red',
        height: '50%',
        width: '50%'
      }
    },
    {
      name: 'Two',
      styles: {
        backgroundColor: 'yellow',
        height: '50%',
        width: '50%'
      }
    },
    {
      name: 'Five',
      styles: {
        backgroundColor: 'white',
        height: '50%',
        width: '50%'
      },
    },
    {
      name: 'Four',
      styles: {
        backgroundColor: 'blue',
        height: '50%',
        width: '50%'
      },
    }
  ]
};

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
