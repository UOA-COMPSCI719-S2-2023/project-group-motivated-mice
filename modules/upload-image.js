const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");

async function linkImageToArticle(images, userId) {
    makeUserFolder(userId);
    images.forEach(element => {
         
        const oldFileName = element.path;
        console.log("🚀 ~ file: upload-image.js:10 ~ linkImageToArticle ~ oldFileName:", oldFileName)
        const newFileName = `./public/images/${userId}/${element.originalname}`;
        fs.renameSync(oldFileName, newFileName);
    });
    await addImageToSQL(newFileName);
};

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

async function addImageToSQL(nameOfImage, userID) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(userID);
    await db.run(SQL`insert into Images (nameOfImage, ArticleID) VALUES (${nameOfImage}, ${ArticleID})`);
}

async function getMostRecentArticle(userID) {
    const db = await dbPromise;
    const result = await db.get(SQL`SELECT ArticleID from Articles WHERE
    UserID = ${userID} ORDER BY ArticleID desc`);
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
    getImageFromId

};