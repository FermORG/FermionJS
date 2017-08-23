const fs = require('fs');
const path = require('path');
const WorkspaceConverter = require('./WorkspaceConverter');
const rimraf = require('rimraf');

class WorkspaceExporter {
  constructor(targetPath, components) {
    this.targetPath = targetPath;
    this.components = components;
  }
  createDir(dirPath) {
    const targetPath = dirPath || this.targetPath;
    try {
      fs.mkdirSync(targetPath);
    } catch (e) {
      // console.log(e);
      throw new Error(`cannot make dir: ${targetPath} ${e}`);
    }
  }
  deleteDir(dirPath = this.targetPath) {
    // const targetPath = dirPath || this.targetPath;
    try {
      rimraf.sync(dirPath);
    } catch (e) {
      // console.log(e);
      throw new Error(`cannot delete dir: ${targetPath} ${e}`);
    }
  }
  export() {
    try {
      fs.mkdirSync(this.targetPath);
      this.components.forEach(component => {
        const compDir = path.join(this.targetPath, component.fileName);
        fs.mkdirSync(compDir);
        const fPath = path.join(compDir, component.fileName + component.ext);
        fs.writeFileSync(fPath, component.code);
      });
    } catch (e) {
      // console.log(e);
      throw new Error(`exporting failed: ${e}`);
    }
  }
}

module.exports = WorkspaceExporter;
