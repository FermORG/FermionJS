const fs = require('fs');
const path = require('path');

const getComponentLibrary = (componentList = getAllComponentFileNames()) => {
  return componentList.map(file => {
    const { jsx, style } = require(`./${file}`);
    const name = path.basename(file, path.extname(file));
    return new ComponentData(name, jsx, style);
  });
};

const getAllComponentFileNames = (directory = path.join(__dirname, '/component-library')) =>
  fs.readdirSync(directory).filter(file => path.extname(file) === '.jsx');

function ComponentData(name, jsx, style) {
  const overrideRequiredComponentStyle = {
    position: 'absolute'
  };

  const defaultRequiredComponentStyle = {
    width: '100px',
    height: '100px'
  };

  this.name = name;
  this.jsx = jsx;
  this.children = [];
  this.props = {};
  this.events = {};

  this.props.style = {
    ...defaultRequiredComponentStyle,
    ...style,
    ...overrideRequiredComponentStyle
  };
};

export default getComponentLibrary;