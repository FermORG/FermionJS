const fs = require('fs');
const path = require('path');

const overrideRequiredComponentStyle = {
  position: 'absolute'
};

const defaultRequiredComponentStyle = {
  width: '100px',
  height: '100px'
};

const getComponentLibrary = (directory = path.join(__dirname, '/components/VisComponents')) => {
  const componentList = fs
    .readdirSync(directory)
    .filter(file => path.extname(file) === '.jsx')

  return componentList.map(file => {
    const { style } = require(`./${file}`);
    const name = file.split('.jsx')[0];

    const finalStyle = {
      ...defaultRequiredComponentStyle,
      ...style,
      ...overrideRequiredComponentStyle
    };

    return {
      name,
      props: { style: finalStyle },
      events: {}
    };
  });
};

export default getComponentLibrary;
