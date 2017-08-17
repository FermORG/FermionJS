'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { BrowserWindow } = require('electron');

const simulator = root => {
  const WIDTH = 800;
  const HEIGHT = 600;
  //Deserialize project info from projInfo file, contains path to index.html and presence of webpack among other things
  // const projInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/projInfo.js')));

  let child = spawn(
    'npm',
    ['start'],
    {
      cwd: '/Users/jyamamoto/_personal/Fermionjs/app/export_files',
      stdio: 'inherit',
      env: process.env 
    }
  )
  setTimeout(()=>{  
      let child = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT
      });
      child.loadURL('http://localhost:8080/');
      child.toggleDevTools();
    }, 5000)
};

module.exports = simulator;
