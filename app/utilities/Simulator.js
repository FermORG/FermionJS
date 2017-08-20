'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { BrowserWindow } = require('electron');

const EXPORT_FILES = 'export_files';
const exportedDir = path.join(__dirname, '../', EXPORT_FILES);
const simulator = root => {
  const WIDTH = 800;
  const HEIGHT = 600;
  let child = spawn(
    'npm',
    ['start'],
    {
      cwd: exportedDir,
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
