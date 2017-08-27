/* Creates App.js file to be exported */

import { WORKSPACE_ID } from '../constants';

export const createTopLevelApp = (workspace, componentNameSet, directory) => {
  let appContents = 'import React, {Component} from \'react\';\n';
  appContents += createComponentImportStatements(componentNameSet);
  appContents += `export class App extends Component {\n`;
  appContents += createAppMethods(workspace.methods);
  appContents += createRenderFunction(workspace.components);
  appContents += '\n}';
  return appContents;
};

const createComponentImportStatements = (componentNameSet) => {
  let output = '';
  componentNameSet.forEach(name => output += `import ${name} from './${name}.js';\n`);
  output += `\n`;
  return output;
};

const createRenderFunction = (components) => {
  const createElementText = (component) => {
    const componentName = component.id === WORKSPACE_ID ? 'div' : component.name;
    const propString = createPropsString(component.props);

    const childElementsString = component.children.reduce((acc, childID) => {
      return acc + '\n' + createElementText(components[childID]);
    }, '') + '\n';

    return (
      `<${componentName} 
      ${createPropsString(component.props)} 
      ${createEventPropsString(component.events)}
      >
        ${childElementsString}
      </${componentName}>`
    );
  };

  return `render() { return ( ${createElementText(components[WORKSPACE_ID])} ); }`;
};

const createPropsString = (props) => {
  return Object.entries(props)
    .reduce((propString, entry) => {
      const [key, val] = entry;
      if (typeof val === 'string' || typeof val === 'number') return propString + `${key}=${val} `
      else return propString + `${key}={${JSON.stringify(val, null, 2)}} `;
    }, '').trim();
};

const createEventPropsString = (events) => {
  return Object.entries(events)
    .reduce((eventString, entry) => {
      const [key, val] = entry;
      return eventString + ` ${key}={${val.trim()}}` + ' ';
    }, '').trim();
};

const createAppMethods = (methodsString) => {
  return methodsString.split('@').reduce((acc, method) => {
    return acc + method.trim() + '\n';
  }, '');
};
