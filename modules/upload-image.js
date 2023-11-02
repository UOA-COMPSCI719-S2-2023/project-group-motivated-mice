const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");

async function linkImageToArticle(fileInfo, userID) {
    const oldFileName = fileInfo.path;
    const originalName = fileInfo.originalname;
    const folderName = `./public/images/${userID}`;
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    const newFileName = `${folderName}/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);
    await makePreviewFolder(newFileName, originalName);


    // await addImageToSQL(fileInfo.originalname);
};

async function makePreviewFolder(newFileName, originalName) {
    const folderName = `./public/images/preview`;
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    const image = await jimp.read(newFileName);
   image.resize(320, jimp.AUTO);
   await image.writeAsync(`${folderName}/${originalName}`);
}



async function addImageToSQL(nameOfImage) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(2);
    await db.run(SQL`insert into Images (nameOfImage, ArticleID) VALUES (${nameOfImage}, ${ArticleID})`);
}

async function getMostRecentArticle(AuthorId) {
    const db = await dbPromise;
    const result = await db.get(SQL`SELECT ArticleID from Articles WHERE
    UserID = ${AuthorId} ORDER BY ArticleID desc`);
    const articleId = result.ArticleID
    return await articleId;
}

async function getImageFromId(articleId) {
    const db = await dbPromise;
    const image = await db.get(SQL`SELECT * FROM Images WHERE ArticleID = ${articleId}`)
    return await image;
}

module.exports = {
    linkImageToArticle,
    getImageFromId,
};