/**
 * Finds all components the user is implementing in their application,
 * and exports them into the users component library
 */

import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
import { WORKSPACE_ID, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY } from '../constants';
import getJsxString from '../component-library/jsxStringParser';
import { createTopLevelApp } from './topLevelAppCreator';
import { writeComponentFiles } from './componentFileCreator';

export const exportApp = (workspace) => {
  createDirectory(EXPORT_DIRECTORY.COMPONENTS);

  const componentNameSet = getComponentNameSet(workspace.components);
  const appFileContents = createTopLevelApp(workspace, componentNameSet, EXPORT_DIRECTORY.COMPONENTS);
  const prettiedAppFile = prettier.format(appFileContents);

  fs.writeFileSync(path.join(EXPORT_DIRECTORY.COMPONENTS, 'App.js'), prettiedAppFile, 'utf8');
  writeComponentFiles(componentNameSet, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY.COMPONENTS);
};

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
};

const getComponentNameSet = (components) => {
  return Object.values(components)
    .reduce((nameSetAccumulator, currentComponent) => {
      if (currentComponent.id !== WORKSPACE_ID) nameSetAccumulator.add(currentComponent.name);
      return nameSetAccumulator;
    }, new Set());
};
