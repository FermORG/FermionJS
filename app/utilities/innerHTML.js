const fs = require('fs');
const path = require('path');
const component = 'weatherboxes5.jsx';
const Component = ''
const fileLocation = path.join(__dirname + '/../component-library/' + component);
const file = String(fs.readFileSync(fileLocation));

// check for function keyword:
const isES5 = file.indexOf('function');

if (isES5) getES5(file);

// const isES6 = file.indexOf('=>');
//
// if (isES6) getES6(file);

//check for implicit return:







function getES6(file) {
  const isES6 = file.indexOf('=>');
  const isImplicit = file.indexOf('(', isES6);

  if (isImplicit === -1) return getES6Implicit(file);

  const startComponent = file.indexOf('=> (');
  let innerHtml = file.slice(startComponent + 4);
  const endComponent = (innerHtml.lastIndexOf('>') + 1);

  innerHtml = innerHtml.slice(0, endComponent);
  console.log(innerHtml);
  return innerHtml;
}

function getES5(file) {
  const startComponent = file.indexOf('return (');
  let innerHtml = file.slice(startComponent + 8);
  const innerHtml = file.lastIndexOf(');');
  innerHtml = innerHtml.slice(0, endComponent);
  console.log(innerHtml);
  return innerHtml;
}

function getES6Implicit(file) {
  const startComponent = file.indexOf('=>');
  let innerHtml = file.slice(startComponent + 3);
  const endComponent = (innerHtml.lastIndexOf('>') + 1);
  innerHtml = innerHtml.slice(0, endComponent);
  console.log(innerHtml);
  return innerHtml;
}
