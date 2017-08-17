const { cloneDeep } = require('lodash');
const components = {
  "One": {
    children: ["Two"],
    props: {
      'test': 'case',
      'style': 'blah',
    }
  },
  "Two": {
      children: [],
      props: {
        'test2': 'case2',
        'style': 'blah2',
      }
  } ,
  "workspace": {
    children: [
      "One",
    ],
  } ,
};

const workspace = {
  components,
  state: {'testy': 'casey'},
};


/*export default*/ function propsParser(workspace) {
  const clonedWorkspace = cloneDeep(workspace);
  const components = clonedWorkspace.components;
  const app = components.app || components.workspace;
  let state = clonedWorkspace.state;
  state = Object.assign(state, getChildProps(app, components));
  return clonedWorkspace;
}

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

/*export*/ function flattenStateProps(state, component, components) {

  const children = components[component].children;
  state = cloneDeep(state);
  const flatState = Object.keys(state).reduce((final, init) => {
      if (children.indexOf(init) === -1) {
        final[init] = state[init];
      } else {
        final = Object.assign(final, flattenStateProps(state[init], init, components));
      }
      return final;
  }, {});
  return flatState;
}

const res = propsParser(workspace);
console.log(JSON.stringify(res, ' '));
const unres = flattenStateProps(res.state, 'workspace', res.components);

console.log(JSON.stringify(unres));
console.log(JSON.stringify(res.state));
