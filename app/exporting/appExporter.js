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
  const componentNameSet = getComponentNamesSet(workspace.components);
  writeComponentFiles(componentNameSet, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY.COMPONENTS);
  const appFileContents = createTopLevelApp(workspace, componentNameSet, EXPORT_DIRECTORY.COMPONENTS);
  fs.writeFileSync(path.join(EXPORT_DIRECTORY.COMPONENTS, 'App.jsx'), appFileContents, 'utf8');
  console.log(appFileContents);
};

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

const getComponentNamesSet = (components) => {
  return Object.values(components)
    .reduce((setAccumulator, currentComponent) => {
      if (currentComponent.id !== WORKSPACE_ID) setAccumulator.add(currentComponent.name);
      return setAccumulator;
    }, new Set());
};

const writeComponentFiles = (componentNameSet, libraryDirectory, exportDirectory) => {
  return componentNameSet.forEach((name) => {
    const fullFileName = `${name}.jsx`;
    const jsxContent = getJsxString(fullFileName, libraryDirectory);
    const fileContents = formatComponentFile(name, jsxContent);
    fs.writeFileSync(path.join(exportDirectory, fullFileName), fileContents);
  });
}

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
  appContents += createRenderFunction(workspace.components);
  return appContents;
}

const createComponentImportStatements = (componentNameSet) => {
  let output = '';
  componentNameSet.forEach(name => output += `import ${name} from './${name}';\n`);
  output += `\n`;
  return output;
};

const createRenderFunction = (components) => {
  const createElementText = (component) => {
    const componentName = component.id === WORKSPACE_ID ? 'App' : component.name;
    const propString = createPropString(component.props);

    const childrenText = component.children.reduce((acc, childID) => {
      return acc + '\n' + createElementText(components[childID]);
    }, '') + '\n';

    return (
      `<${componentName} ${createPropString(component.props)}>${childrenText}</${componentName}>`
    );
  }

  return 'render() {\n' + createElementText(components[WORKSPACE_ID]) + '\n}';
}

const createPropString = (props) => {
  return Object.entries(props)
    .reduce((propString, entry) => {
      const [key, val] = entry;
      if (typeof val === 'string' || typeof val === 'number') return propString + `${key}=${val} `
      else return propString + `${key}={${JSON.stringify(val, null, 2)}} `;
    }, '').trim();
}

/*  */
