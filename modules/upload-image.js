const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");

async function linkImageToArticle(fileInfo) {
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    const filePath = newFileName;
    fs.renameSync( oldFileName , newFileName );
    await addImageToSQL(filePath);
};

async function addImageToSQL(filePath) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(2);    
    await db.run(SQL`insert into Images (ImageURL, ArticleID) VALUES (${filePath}, ${ArticleID})`);
}

async function getMostRecentArticle(AuthorId) {
    const db = await dbPromise;
    const result = await db.get(SQL`SELECT ArticleID from Articles WHERE
    UserID = ${AuthorId} ORDER BY ArticleID desc`);
    const articleId = result.ArticleID
    return await articleId;
}

module.exports = {
    linkImageToArticle
};