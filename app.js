const path = require('path');
const fs = require('fs');

//path to work with

const currentPath = path.join(path.dirname(__dirname) + "/sortingfilesfolder/testZone/");

//It creates a folder pattern "extensionFile + Files" and move this file into its folder

function handlingFiles(currentPath) {
    const newFoldersCreated = [];
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
            });
        }
    });
    return newFoldersCreated;
}

// count the files about the folder 

function countingFiles(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result.length); //return number of files
            }
        });
    });
}

//it creates and array of objects like : [{"folderName":"jpegFiles","numberFiles":2},{"folderName":"textFiles","numberFiles":3}]

function filesForFolder(array, callback) {
    const arrNumberFilesFolders = [];
    array.forEach(async (nameFolder, indexFile) => {
        newFolderPath = currentPath + "/" + nameFolder;
        const totalFiles = await countingFiles(newFolderPath);

        var obj = {};
        obj["folderName"] = nameFolder;
        obj["numberFiles"] = totalFiles;

        arrNumberFilesFolders.push(obj)
        const index = indexFile >= array.length - 1;
        if (index) {
            callback(arrNumberFilesFolders);
        }
    })
}

//It executes the functions

(async () => {
    const newFoldersCreated = await handlingFiles(currentPath)
    await filesForFolder(newFoldersCreated, (data) => {
        console.log('data: ' + JSON.stringify(data));
    })
})()