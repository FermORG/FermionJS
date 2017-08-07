// @flow
// complist reducers
import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../actions/complist';

type actionType = {
  +type: string,
};

const defaultData = {
  "availableComponents" : [
    {
      "name": "one",
      "styles": {
        "backgroundColor": "red",
        "height": "50%",
        "width": "50%"
      }
    },
    {
      "name": "two",
      "styles": {
        "backgroundColor": "yellow",
        "height": "50%",
        "width": "50%"
      }
    },
    {
      "name": "five",
      "styles": {
        "backgroundColor": "white",
        "height": "50%",
        "width": "50%"
      },
    },
    {
      "name": "four",
      "styles": {
        "backgroundColor": "blue",
        "height": "50%",
        "width": "50%"
      },
    }
  ]
}


export default function listReducer(state: {} = defaultData, action: actionType) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_COMPONENTS:
      return newState.components.concat(action.components);
    case ADD_TO_PROJECT:
      console.log('This will add component a to the project bro');
      console.log(`the state is: ${JSON.stringify(state)}`);
      console.log(`this is component: ${JSON.stringify(state[+action.component])}`)
      return newState;
    default:
      return newState;
  }
}
