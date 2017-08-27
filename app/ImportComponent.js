// allows users to import Custom Components
import electron from 'electron';
// import remote from 'remote';
const { dialog } = electron;
import fs from 'fs';

const importer = {


import: dialog.showOpenDialog((fileNames) => {
  if (!fileNames) {
    alert('select a file');
    return;
  }

  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      alert('an error occured!');
      return;
    }
    alert(data);
  });
}),

}
export default importer;
