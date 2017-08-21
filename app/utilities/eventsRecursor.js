const { cloneDeep } = require('lodash');
/**
* @param {object} parent - Object being examined
* @param {object} components - workspace.components regardless of first param ID
*/

export function getChildEvents(parent, components) {
  const { children } = parent;
  let events = parent.events || {};
  if (children.length === 0){
    return events;
  }
  children.forEach((child) => {
    events[child] = Object.assign({}, getChildEvents(components[child], components));
  });

  return events;
}

/**
* @param {object} events - workspace events or component events
* @param {string} component - string name of component
* @param {object} components - workspace.components regardless of first param ID
*/

export function flattenEvents(events, component, components) {
  const children = components[component].children;
  events = cloneDeep(events);
  return Object.keys(events).reduce((final, init) => {
    if (children.indexOf(Number(init)) === -1) {
      final[init] = events[init];
    } else {
      final = Object.assign(final, flattenEvents(events[init], init, components));
    }
    delete final.style;
    return final;
  }, {});
}

// const test = eventsParser(defaultWorkspace);
//
// console.log(test.components.workspace.events);
//
// const flat = flattenEvents(test.components.workspace.events, 'workspace', test.components);
//
// console.log(flat);
