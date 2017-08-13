import fs from 'fs';
import path from 'path';
 // DONE // checks for a directory, if exists, do nothing, if not exists, create it.

// DONE // directory exists: pop in, load up fermion.config.json

// DONE // directory does not exist: pop in, save fermion.config.json and execute default setup.


// Doneish, needs frontend hooks when components are added to fermion, their name is added to the list in config.json. these are then loaded up by the file system to be dNd'd.

// Doneish, needs full hooks on frontend. on read in, needs to pass values to state.

// read in should not occur until the config is ready, otherwise components will be missing.
    // possible soln : pipe ?


// need to make changes for OSX/WIN/LIN.


// Users/user/.fermion
// Home/.fermion
// C:\Users\USER\AppData\Roaming\Code\User/.fermion;


class FileLib {

  static makeDir(appHook) {
    const fPath = `${appHook.getPath('home')}/.fermion`;

    try {
      fs.mkdirSync(fPath);
      return true;
    } catch (e) {
      if (e.code === 'EEXIST') {
        return true;
      }
      throw new Error('something happened!');
    }
  }

  static makeConfig(appHook) {
    // makes the config file.
    let configPath = '';
    if (process.env.NODE_ENV === 'development') {
      // configPath = path.join(__dirname + '/../dist/fermion.config.json');
      configPath = path.join(`${__dirname}/fermion.config.json`);
      // HACK need to find way to include with webpack.
    } else {
      configPath = path.join(`${__dirname}/dist/fermion.config.json`);
    }

    const config = fs.readFileSync(configPath);
    const options = { flag: 'wx' };
    const fPath = `${appHook.getPath('home')}/.fermion/fermion.config.json`;

    try {
      fs.writeFileSync(fPath, config, options);
      return true;
    } catch (e) {
      if (e.code = 'EEXIST') {
        return true;
      }
      throw new Error('something happened, couldn\'t save resources!');
    }
  }

    // brings in the config file, returns to mainproc to send to window.
  static loadConfig(appHook) {
    const configPath = `${appHook.getPath('home')}/.fermion/fermion.config.json`;

    const config = fs.readFileSync(configPath, 'utf8');
    return config;
  }

      // adds components to library;
  static updateConfig(appHook, componentsToAdd) {
    const configPath = `${appHook.getPath('home')}/.fermion/fermion.config.json`;

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.components = config.components.concat(componentsToAdd);
    try {
      fs.writeFileSync(configPath, JSON.stringify(config, null, '  '));
      return true;
    } catch (e) {
      throw new Error('unable to add components!');
    }
  }


}

export default FileLib;
