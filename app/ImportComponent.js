// allows users to import Custom Components
import electron from 'electron';
// import remote from 'remote';
const { dialog } = electron;
import fs from 'fs';

const options = {
  title: 'Select Components',
  buttonLabel: 'Import',
  filters: [
    {
      name: 'React Components',
      extensions: [
      'jsx',
     ],
    },
  ],
  properties: [
    'openFile',
    'multiSelections',
  ],
};

const importWrapper = () => {
  return dialog.showOpenDialog(options, (fileNames) => {
    if (!fileNames) {
      return;
    }
    console.log(fileNames);

    // fs.readFile(filepath, 'utf-8', (err, data) => {
    //   if (err) {
    //     console.log('an error occured!');
    //     return;
    //   }
    //   console.log(data);
    // });
  });
}

export default importWrapper;
