'use strict';

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const { BrowserWindow } = require('electron');

const simulator = root => {
  const WIDTH = 800;
  const HEIGHT = 600;
  //Deserialize project info from projInfo file, contains path to index.html and presence of webpack among other things
  // const projInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/projInfo.js')));

  console.log('process', process.env)

  let child = spawn(
    // '/Users/jyamamoto/.nvm/versions/node/v8.1.3/bin/npm',
    'npm',
    ['start'],

    {
      cwd: '/Users/jyamamoto/_personal/Fermionjs/app/export_files',
      stdio: 'inherit',
      env: process.env 
    }

  )
  console.log('process', process.env)
  setTimeout(()=>{  
      let child = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT
      });
      // child.loadURL('http://google.com');
      child.loadURL('http://localhost:8080/');
      child.toggleDevTools();
    }, 5000)

  //Dynamic simulation
  // if (projInfo.hotLoad) {
  console.log('hello')
  // 'npm start'
  //  'touch /Users/jyamamoto/hello_hai',
  // let child = exec(
  //   // 'npm start',
  //   'touch /Users/jyamamoto/hello_hai',
  //   {
  //     cwd: '/Users/jyamamoto/_personal/Fermionjs/app/export_files'
  //     // cwd:projInfo.rootPath
  //   },
  //   (err, stdout, stderr) => {
  //     console.log(err)
  //     console.log(stdout)
  //     console.log(stderr)
  //     let child = new BrowserWindow({
  //       width: WIDTH,
  //       height: HEIGHT
  //     });
  //     // child.loadURL('http://google.com');
  //     child.loadURL('http://localhost:8080/');
  //     child.toggleDevTools();
  //   }
    
  // );
  //  else if (projInfo.webpack) {
  //   let child = exec(
  //     'webpack',
  //     {
  //       cwd: projInfo.rootPath,
  //       shell: '/bin/bash'
  //     },
  //     (err, stdout, stderr) => {
  //       let child = new BrowserWindow({
  //         width: WIDTH,
  //         height: HEIGHT
  //       });
  //       child.loadURL('file://' + projInfo.htmlPath);
  //       child.toggleDevTools();
  //     }
  //   );
  // } else if (projInfo.htmlPath) {
  //   let child = new BrowserWindow({
  //     width: WIDTH,
  //     height: HEIGHT
  //   });
  //   child.loadURL('file://' + projInfo.htmlPath);
  //   child.toggleDevTools();
  // } else {
  //   console.log('No Index.html found');
  // }
};

module.exports = simulator;
