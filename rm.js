   //removes files and folders created in order to run the tests

   const fse = require('fs-extra');

   (async () => {
       await fse.remove("./tests/testingZone/textFiles", () => {
           console.log("Folder ./tests/testingZone/textFiles Deleted!");
       });
       await fse.remove("./tests/testingZone/jpegFiles", () => {
           console.log("Folder ./tests/testingZone/jpegFiles Deleted!");
       });
   })()