// allows users to import Custom Components
import electron from 'electron';
const { dialog } = electron;
import fs from 'fs';
import path from 'path';

const libraryPath = path.join(__dirname + '/component-library/');
const options = {
  title: 'Select Components',
  buttonLabel: 'Import',
  filters: [
    {
      name: 'React Components',
      extensions: ['jsx'],
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

    fileNames.forEach((file) => {
      const name = file.lastIndexOf('/');
      const fileName = file.slice(name + 1);
      const savePath = path.join(libraryPath + fileName);
      fs.createReadStream(file).pipe(fs.createWriteStream(savePath));
    });

  });
}

export default importWrapper;
