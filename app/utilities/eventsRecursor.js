import { cloneDeep }  from 'lodash';
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

export function flattenEvents(events, component, components, methods) {
  const children = components[component].children;
  events = cloneDeep(events);
  return Object.keys(events).reduce((final, key) => {
    if (children.indexOf(Number(key)) === -1) {
      final[key] = events[key];
    } else {
      console.log('ee', events);
      const methodEvents = insertMethods(events[key], methods);
      console.log('me', methodEvents);
      console.log('ee', events);

      final = Object.assign(final, flattenEvents(events[key], key, components));
    }
    // delete final.style;
    console.log('ret: ',final, 'comp: ', component);
    return final;
  }, {});
}

/**
* @param {function} insertMethods - used to replace 'onClick' etc with the method it calls in the properties chain, both in the destructuring action and the chain action in a component's parent.
* @param {object} events - events for a given component. may be CHILD or OWN.
* @param {array} methods - methodNames array
*/

export function insertMethods(events, methods) {
  Object.keys(events).forEach((key) => {
    const toTest = events[key].split('() => ').join('()=>').split('()=>').join('').replace(/\((.+)\)/, '').split('()').join('');
    if (key === toTest) return;
    const methName = methods.indexOf(toTest);
    if (methName !== -1) {
      Object.defineProperty(events, methods[methName], Object.getOwnPropertyDescriptor(events, key));
      delete events[key];
    } else {
      delete events[key];
    }
  });
  return events;
}
/**
* @param {function} insertThis - used to insert the 'this' keyword into a passed down method from app.js
* @param {object} events - events for a given component. may be CHILD or OWN.
* @param {array} methods - methodNames array
*/
export function insertThis(events, methods) {
  Object.keys(events).forEach((key) => {
    const toTest = events[key].split('() => ').join('()=>').split('()=>').join('').replace(/\((.+)\)/, '').split('()').join('');
    const methName = methods.indexOf(toTest);
    if (methName !== -1) {
      const method = methods[methName];
      const newEvent = events[key].split(method).join(`this.${method}`);
      events[key] = newEvent;
    }
  });
  return events;
}
