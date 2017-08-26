const fs = require('fs');
const path = require('path');

export default function captureHtml(component) {
  const fileLocation = path.join(__dirname + '/../app/component-library/' + component);
  const file = String(fs.readFileSync(fileLocation));

// check for function keyword:
  const isES5 = file.indexOf('function');

  if (isES5 !== -1) return getES5(file);
// check for an arrow function:
  const isES6 = file.indexOf('=>');

  if (isES6 !== -1) return getES6(file);
}

function getES6(file) {
  const isES6 = file.indexOf('=>');
// check for implicit return:
  const isImplicit = file.indexOf('(', isES6);
  if (isImplicit === -1) return getES6Implicit(file);

  const startComponent = file.indexOf('=>');
  let innerHtml = file.slice(startComponent + 4);
  const endComponent = (innerHtml.lastIndexOf('>') + 1);
  innerHtml = innerHtml.slice(0, endComponent);

  return innerHtml;
}

function getES5(file) {
  const startComponent = file.indexOf('return (');
  let innerHtml = file.slice(startComponent + 8);
  const endComponent = innerHtml.lastIndexOf(')');
  innerHtml = innerHtml.slice(0, endComponent);
  return innerHtml;
}

function getES6Implicit(file) {
  const startComponent = file.indexOf('=>');
  let innerHtml = file.slice(startComponent + 3);
  const endComponent = (innerHtml.lastIndexOf('>') + 1);
  innerHtml = innerHtml.slice(0, endComponent);

  return innerHtml;
}
