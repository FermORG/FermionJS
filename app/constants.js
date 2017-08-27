import path from 'path';

const constants = {
  WORKSPACE_ID: 'workspace',
  STATIC_INNER_COMPONENT_STYLE: {
    width: '100%',
    height: '100%',
    left: null,
    top: null,
    overflow: 'hidden'
  },
  COMPONENT_LIBRARY_DIRECTORY: path.join(__dirname, 'component-library'),
  EXPORT_DIRECTORY: {
    MAIN: path.join(__dirname, 'export_files')
  }
};

constants.EXPORT_DIRECTORY.COMPONENTS = path.join(constants.EXPORT_DIRECTORY.MAIN, '/components');

export default constants;