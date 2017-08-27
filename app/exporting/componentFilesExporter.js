/**
 * Finds all components the user is implementing in their application,
 * and exports them into the users component library
 */

import path from 'path';
import fs from 'fs';
import { WORKSPACE_ID, COMPONENT_LIBRARY_DIRECTORY, EXPORT_DIRECTORY } from '../constants';
import getJsxString from '../component-library/jsxStringParser';

export const exportComponentFiles = (components) => {

  const componentNameSet = Object.values(components)
    .reduce((setAccumulator, currentComponent) => {
      if (currentComponent.id !== WORKSPACE_ID) setAccumulator.add(currentComponent.name);
      return setAccumulator;
    }, new Set());

  componentNameSet.forEach((name) => {
    const fullFileName = `${name}.jsx`;
    const fileContents = getJsxString(fullFileName, COMPONENT_LIBRARY_DIRECTORY);
    fs.writeFileSync(path.join(COMPONENT_LIBRARY_DIRECTORY, fullFileName), fileContents);
  })
  // const componentFiles = Array.from(componentSet.values())
  //   .map(name => fs.readFileSync(path.join(COMPONENT_LIBRARY_DIRECTORY, `${name}.jsx`), 'utf8'));
}
