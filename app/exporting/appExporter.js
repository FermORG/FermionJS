/**
 * Finds all components the user is implementing in their application,
 * and exports them into the users component library
 */

import path from 'path';
import fs from 'fs';
import { WORKSPACE_ID, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY } from '../constants';
import getJsxString from '../component-library/jsxStringParser';

export const exportApp = (workspace) => {
  createDirectory(EXPORT_DIRECTORY.COMPONENTS);

  const componentNameSet = getComponentNameSet(workspace.components);
  const appFileContents = createTopLevelApp(workspace, componentNameSet, EXPORT_DIRECTORY.COMPONENTS);

  fs.writeFileSync(path.join(EXPORT_DIRECTORY.COMPONENTS, 'App.js'), appFileContents, 'utf8');
  writeComponentFiles(componentNameSet, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY.COMPONENTS);
};

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
};

const getComponentNameSet = (components) => {
  return Object.values(components)
    .reduce((nameSetAccumulator, currentComponent) => {
      if (currentComponent.id !== WORKSPACE_ID) nameSetAccumulator.add(currentComponent.name);
      return nameSetAccumulator;
    }, new Set());
};

const writeComponentFiles = (componentNameSet, libraryDirectory, exportDirectory) => {
  return componentNameSet.forEach((name) => {
    const fullFileName = `${name}.jsx`;
    const jsxContent = getJsxString(fullFileName, libraryDirectory);
    const fileContents = formatComponentFile(name, jsxContent);
    fs.writeFileSync(path.join(exportDirectory, fullFileName.slice(0, -1)), fileContents);
  });
};

const formatComponentFile = (componentName, jsxContent) => (
  `import React from 'react';
  ${jsxContent}
  export default ${componentName}`
);

/*  */

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

    const childrenText = component.children.reduce((acc, childID) => {
      return acc + '\n' + createElementText(components[childID]);
    }, '') + '\n';

    return (
      `<${componentName} ${createPropsString(component.props)} ${createEventPropsString(component.events)}>${childrenText}</${componentName}>`
    );
  };

  return 'render() {\nreturn (' + createElementText(components[WORKSPACE_ID]) + '\n);' + '\n}';
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

/*  */
