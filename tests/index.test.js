const fs = require('fs');

const {
    filesForFolder,
    handlingFiles,
    countingFiles
} = require('../utils/utils');




describe('Testing functions', () => {

    function fileCreator(numberFiles, extensionFile) {
        for (let i = 0; i < numberFiles; i++) {
            fs.writeFileSync(`./tests/testingZone/file${i}.${extensionFile}`, "test" + i);
        }
    }

    //before all tests we create some files 

    beforeAll(async () => {

        //it creates a files  

        await fileCreator(3, "text");
        await fileCreator(2, "jpeg");
    });


    it("checking handlingFiles function ", async () => {
        const newFoldersCreated = await handlingFiles("./tests/testingZone/")
        expect(newFoldersCreated).toStrictEqual(['jpegFiles', 'textFiles']);
    })

    it("checking countingFiles function", async () => {
        const numberOfFiles = await countingFiles("./tests/testingZone/textFiles/")
        expect(numberOfFiles).toBe(3);
    })

    it("checking filesForFolder function", async () => {
        const currentPath = "./tests/testingZone";
        await filesForFolder(currentPath, ['jpegFiles', 'textFiles'], (data) => {
            var out = data.map(function (item) {
                return {
                    folderName: item.folderName,
                    numberFiles: item.numberFiles
                };
            });
            expect(out).toBe([{
                folderName: 'jpegFiles',
                numberFiles: 2
            }, {
                folderName: 'textFiles',
                numberFiles: 3
            }]);
        })
    })
})