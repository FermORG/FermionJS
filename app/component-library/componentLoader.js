const fs = require('fs');
const path = require('path');
const { getJsxString } = require('./jsxStringParser');

const getComponentLibrary = (componentList = getAllComponentFileNames()) => {
  return componentList.map(file => {
    const name = path.basename(file, path.extname(file));
    const { jsx, style } = require(`./${file}`);
    const jsxAsString = getJsxString(file);
    const finalStyle = formatFinalStyle(style);
    return { name, jsx, jsxAsString, style: finalStyle };
  });
};

const getAllComponentFileNames = (directory = path.join(__dirname, '/component-library')) =>
  fs.readdirSync(directory).filter(file => path.extname(file) === '.jsx');

const formatFinalStyle = (style) => {
  const overrideRequiredComponentStyle = {
    position: 'absolute'
  };

  const defaultRequiredComponentStyle = {
    width: '100px',
    height: '100px'
  };

  return {
    ...defaultRequiredComponentStyle,
    ...style,
    ...overrideRequiredComponentStyle
  }
};

export default getComponentLibrary;
