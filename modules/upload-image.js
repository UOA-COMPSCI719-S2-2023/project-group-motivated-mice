const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");

async function linkImageToArticle(fileInfo) {
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);
    await addImageToSQL(fileInfo.originalname);
};

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
    getImageFromId
};