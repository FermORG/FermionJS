// @flow
// config reducer

import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, CHANGE_STATE, CHANGE_PROPS, CHANGE_STYLES, CHANGE_EVENTS } from '../actions/config';

export type configStateType = {
  //what goes here?
};

type actionType = {
  +type: string
};



export default function toggleConfig(state: configStateType, action: actionType) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    // use component name to locate change.
    // inject new whatever if adding
    // update whatever if changing.
    case ADD_STATE:
    return

    case ADD_PROPS:
    return

    case ADD_STYLES:
    return

    case ADD_EVENTS:
    return

    case CHANGE_STATE:
    return

    case CHANGE_PROPS:
    return

    case CHANGE_STYLES:
    return

    case CHANGE_EVENTS:
    return

    default:
    return state;
  }

  // should allow user to add a prop/etc
  // should allow user to edit prop.
  // should show relevant data bits when a tab is displayed. does that need a reducer? compLib isn't using one.
}
