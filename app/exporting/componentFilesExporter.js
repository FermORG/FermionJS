/**
 * Finds all components the user is implementing in their application,
 * and exports them into the users component library
 */

import path from 'path';
import fs from 'fs';
import { WORKSPACE_ID, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY } from '../constants';
import { getJsxString } from '../component-library/jsxStringParser';

export const exportComponentFiles = (components) => {
  createDirectory(EXPORT_DIRECTORY.COMPONENTS);
  const componentNameSet = getComponentNamesSet(components);
  writeComponentFiles(componentNameSet, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY.COMPONENTS);
};

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  // return new Promise((resolve, reject) => {
  //   fs.stat(directory, (err, stats) => {
  //     if (err) return reject(err);

  //     if (!stats.isDirectory()) {
  //       fs.mkdirSync(directory);
  //       resolve();
  //     }
  //   });
  // });
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
