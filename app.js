const path = require('path');
const fs = require('fs');

const newFoldersCreated = [];

const currentPath = path.join(path.dirname(__dirname) + "/sortingfilesfolder/testZone/");

console.log(currentPath);

//listing root project files
fs.readdirSync(currentPath).forEach(file => {
    const isFile = fs.lstatSync(currentPath + file).isFile() ? true : false; //checking if is a file

    if (isFile) {
        const ext = (path.extname(file)).slice(1); //removing dot from extension
        const folderName = ext + "Files";

        const newPath = path.join(currentPath, folderName);

        //checking if extension folder exists otherwise create it
        if (!fs.existsSync(newPath)) {

            newFoldersCreated.push(folderName);

            fs.mkdirSync(newPath, {
                recursive: true
            }, (err) => {
                if ((err) => console.log(err));
            });
        }

        const oldPathAndFile = currentPath + "/" + file;
        const newPathAndFile = newPath + "/" + file;

        fs.rename(oldPathAndFile, newPathAndFile, function (err) {
            if ((err) => console.log(err));
            console.log(`archivo ${file} movido a / ${folderName}`);
        });
    }


});


function countingFiles(path) {
    fs.readdir(path, function (error, files) {
        var totalFiles = files.length; // return the number of files
        console.log(totalFiles); // print the total number of files 
    });
}


newFoldersCreated.forEach((x) => {

    newFolderPath = currentPath + "/" + x;
    countingFiles(newFolderPath)
    //console.log(` carpeta ${x} creada con ${totFiles} archivos`);

});