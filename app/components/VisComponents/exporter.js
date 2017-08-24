const fs = require('fs');
const path = require('path');

const components = fs
  .readdirSync(path.join(__dirname, '/components/VisComponents'))
  .filter(file => path.extname(file) === '.jsx')
  .reduce((acc, file) => {
    const fileName = file.split('.jsx')[0];
    const { jsx } = require(`./${file}`);
    acc[fileName] = jsx;
    return acc;
  }, {});

const getVisComponent = (key) => components[key];

export default getVisComponent;
