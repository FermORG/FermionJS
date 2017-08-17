const { cloneDeep } = require('lodash');
// const components = {
//   "One": {
//     children: ["Two"],
//     props: {
//       'test': 'case',
//       'style': 'blah',
//     }
//   },
//   "Two": {
//       children: [],
//       props: {
//         'test2': 'case2',
//         'style': 'blah2',
//       }
//   } ,
//   "workspace": {
//     children: [
//       "One",
//     ],
//   } ,
// };
//
// const workspace = {
//   components,
//   state: {'testy': 'casey'},
// };

/**
* @param {object} workspace:redux_top_level_workspace_state_obj
*/

export function propsParser(workspace) {
  const clonedWorkspace = cloneDeep(workspace);
  const components = clonedWorkspace.components;
  const app = components.app || components.workspace;
  let state = clonedWorkspace.state;
  state = Object.assign(state, getChildProps(app, components));
  return clonedWorkspace;
}

/**
* @param {object} parent:Object_being_examined
* @param {object} components:workspace.components_regardless_of_first_param_ID
*/

function getChildProps(parent, components) {
  const { children } = parent;
  let props = parent.props || {};
  delete props.style;
  if (children.length === 0){
    return props;
  }
  children.forEach((child) => {
     props[child] = Object.assign({}, getChildProps(components[child], components));
  });
  return props;
}

/**
* @param {object} state:workspace_state_or_component_props
* @param {string} component:string_name_of_component
* @param {object} components:workspace.components_regardless_of_first_param_ID
*/

export function flattenStateProps(state, component, components) {
  const children = components[component].children;
  state = cloneDeep(state);
  return Object.keys(state).reduce((final, init) => {
      if (children.indexOf(Number(init)) === -1) {
        final[init] = state[init];
      } else {
        final = Object.assign(final, flattenStateProps(state[init], init, components));
      }
      return final;
  }, {});
}

// const res = propsParser(workspace);
// console.log(JSON.stringify(res, ' '));
// const unres = flattenStateProps(res.components['One'].props, 'One', res.components);
//
// console.log(JSON.stringify(unres));
// console.log(JSON.stringify(res.state));
