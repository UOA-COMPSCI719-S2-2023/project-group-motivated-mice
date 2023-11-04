// const SQL = require("sql-template-strings");
// const dbPromise = require("./database.js");
const fs = require("fs");
//const jimp = require("jimp");
const postingDao = require("./article-dao.js");

async function linkImageToArticle(images, userId, firstImage) {
    makeUserFolder(userId);
    //adding images to the user's folder
    const nameArray = [];
    images.forEach(element => {
        const oldFileName = element.path;
        const newFileName = `./public/images/${userId}/${element.originalname}`;
        fs.renameSync(oldFileName, newFileName);
        nameArray.push(element.originalname);
    });
    const thumbnailName = firstImage.originalname;
    await postingDao.addImageToSQL(nameArray, userId, thumbnailName);
};

async function updateImageOfArticle(images,articleID, firstImage, userId) {
    const currentImages = await postingDao.getAllImagesOfArticle(articleID);
    console.log("🚀 ~ file: upload-image.js:23 ~ updateImageOfArticle ~ currentImages:", currentImages)
    currentImages.forEach(function(image){
        const currentFileURL =  `./public/images/${userId}/${image.ImageURL}`;
        fs.unlink(currentFileURL, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
          }); 
    })
    const nameArray = [];
    images.forEach(element => {
        const oldFileName = element.path;
        const newFileName = `./public/images/${userId}/${element.originalname}`;
        fs.renameSync(oldFileName, newFileName);
        nameArray.push(element.originalname);
    });
    const thumbnailName = firstImage.originalname;
    await postingDao.updateImageSQL(nameArray, articleID, thumbnailName);
}

async function makeUserFolder(userID) {
    const folderName = `./public/images/${userID}`;
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    linkImageToArticle,
    updateImageOfArticle
};