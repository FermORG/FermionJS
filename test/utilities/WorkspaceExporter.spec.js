const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const WorkspaceExporter = require('../../app/utilities/WorkspaceExporter');

const components =  [
  {
    fileName: 'test1',
    ext: '.js',
    code: 'console.log("hello")'
  },
  {
    fileName: 'test2',
    ext: '.js',
    code: 'const test = 3'
  },
]
const EXPORT_DIR = 'export_test';
const destinationDir = path.join(__dirname, EXPORT_DIR);
const exporter = new WorkspaceExporter(destinationDir, components)

beforeEach(() => {
  rimraf.sync(destinationDir)
});
afterAll(() => {
  rimraf.sync(destinationDir)
});

describe('exporter will', ()=>{
  test('create files', () => {
    exporter.export();
    let targetPath = path.join(destinationDir, 'test1', 'test1.js' );
    let targetPath2 = path.join(destinationDir, 'test2', 'test2.js' );
    expect(fs.existsSync(targetPath)).toBe(true);
    expect(fs.existsSync(targetPath2)).toBe(true);
  })
  test('export component\'s code', () => {
    const fileContentOf = (targetPath)=>{
      return fs.readFileSync(targetPath, {encoding: 'utf8'});
    }
    exporter.export()
    let targetPath = path.join(destinationDir, 'test1', 'test1.js' );
    let targetPath2 = path.join(destinationDir, 'test2', 'test2.js' );
    expect(fileContentOf(targetPath)).toBe('console.log("hello")');
    expect(fileContentOf(targetPath2)).toBe('const test = 3');
  })
})
