const fs = require('fs')
const path  = require('path')
const WorkspaceConverter = require('./WorkspaceConverter')
const rimraf = require('rimraf')

let components = [
{
  id: 0,
  name: 'BlackBox',
  children: [],
  props: {
    style: {
      position: 'relative',
      zIndex: 1,
    },
    'zIndex': 'testProp',
  }
},
{
  id: 1,
  name: 'BlueBox',
  children: [],
  props: {
    style: {
      position: 'relative',
      height: '30px',
    },
  }
}
]

class WorkspaceExporter {
  constructor(targetPath, components){
    this.targetPath = targetPath
    this.components= components
  }
  createDir(dirPath){
    let targetPath = dirPath ? dirPath : this.targetPath 
    try {
      fs.mkdirSync(targetPath)
    } catch (e){
      console.log(e)
      throw new Error(`cannot make dir: ${targetPath} ${e}`)
    }
  }
  deleteDir(dirPath){
    let targetPath = dirPath ? dirPath : this.targetPath 
    try {
      rimraf.sync(targetPath)
    } catch (e){
      console.log(e)
      throw new Error(`cannot delete dir: ${targetPath} ${e}`)
    }
  }
  exportFile(fPath, content){
    try {
      fs.writeFileSync(fPath, 'hello');
    } catch (e) {
      console.log(e)
      throw new Error(`saving resource failed: ${e}`);
    }
  }
  export(){
    try {
      fs.mkdirSync(this.targetPath)
      this.components.forEach(component =>{
        let compDir = path.join(this.targetPath, component.name)
        fs.mkdirSync(compDir)
        let fPath = path.join(compDir, component.name)
        fs.writeFileSync(fPath, component.code)
      })
    } catch(e){
      console.log(e)
      throw new Error(`exporting failed: ${e}`)
    }
  }
}
let destinationDir = '/Users/jyamamoto/testFerm/test'
let wc = new WorkspaceConverter(components)
let exporter = new WorkspaceExporter(destinationDir, wc.convert())
exporter.deleteDir()
exporter.export(components)
