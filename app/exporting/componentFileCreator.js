import fs from 'fs';
import path from 'path';import prettier from 'prettier';
import getJsxString from '../component-library/jsxStringParser';

export const writeComponentFiles = (componentNameSet, libraryDirectory, exportDirectory) => {
  return componentNameSet.forEach((name) => {
    const fullFileName = `${name}.jsx`;
    const jsxContent = getJsxString(fullFileName, libraryDirectory);
    const fileContents = formatComponentFile(name, jsxContent);
    const prettiedFile = prettier.format(fileContents);
    fs.writeFileSync(path.join(exportDirectory, fullFileName.slice(0, -1)), prettiedFile);
  });
};

const formatComponentFile = (componentName, jsxContent) => (
  `import React from 'react';
  ${jsxContent}
  export default ${componentName}`
);
