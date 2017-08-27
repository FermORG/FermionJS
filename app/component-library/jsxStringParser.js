import path from 'path';
import fs from 'fs';

const jsxIdentifier = {
  start: '/* @fermion jsx */',
  end: '/* @fermion !jsx */'
}

const getJsxString = (fileName, directory = path.join(__dirname, '/component-library')) =>
  fs.readFileSync(path.join(directory, fileName), 'utf8')
  .split(jsxIdentifier.start)[1]
  .split(jsxIdentifier.end)[0]

export default getJsxString;
