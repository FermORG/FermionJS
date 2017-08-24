const fs = require('fs');
const path = require('path');

const overrideRequiredComponentStyle = {
  position: 'absolute'
};

const defaultRequiredComponentStyle = {
  width: '100px',
  height: '100px'
};

const getComponentLibrary = (directory = __dirname) => {
  const componentList = fs
    .readdirSync(directory)
    .filter(file => path.extname(file) === '.jsx')

  return componentList.map(file => {
    const { style } = require(path.join(directory, file));
    const componentData = { name: path.name(file) };

    {
      ...defaultRequiredComponentStyles,
      ...style,
      ...overrideRequiredComponentStyle
    };

    return componentData;
  });
};

export getComponentLibrary;