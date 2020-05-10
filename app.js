const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const {
    filesForFolder,
    handlingFiles,
    countingFiles
} = require('./utils/utils')


//fetching path from terminal

const clientPath = process.argv[2];

//adjusting the path

const currentPath = path.join(path.dirname(__dirname) + clientPath);

if (!fs.existsSync(currentPath)) {
    console.clear();
    console.log(chalk.red("No existe la ruta: " + currentPath));
} else {
    (async () => {
        const newFoldersCreated = await handlingFiles(currentPath)
        if (newFoldersCreated.length === 0) {

            return console.log(chalk.yellow("No hay archivos que organizar."));
        }
        await filesForFolder(currentPath, newFoldersCreated, (data) => {
            //console.log(chalk.green('data: ' + JSON.stringify(data)));
            console.clear();
            console.log(chalk.inverse.green('LISTANDO CARPETAS CREADAS'));

            var out = data.map(function (item) {
                return {
                    folderName: item.folderName,
                    numberFiles: item.numberFiles
                };
            });
            console.table(out);
        })
    })()
}


// function getSize(file) {
//     const stats = fs.statSync(file);
//     const fileSizeInBytes = stats.size;
//     //Convert the file size to megabytes (optional)
//     const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
//     return console.log('tamaño: ' + fileSizeInMegabytes + " Mb");
// }

// getSize("app.js")