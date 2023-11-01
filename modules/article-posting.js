const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");

async function createPost(AuthorId, content, title) {
    const db = await dbPromise;

    await db.run(SQL`
        INSERT INTO articles (UserID, Content, Title, Likes, PublishDate)
        VALUES(${AuthorId}, ${content}, ${title}, 0, datetime('now'))`);
}

async function retrieveSingleArticleId(AuthorId, content) {
    const db = await dbPromise;
    const articleId = await db.get(SQL`SELECT ArticleID FROM Articles WHERE UserID = ${AuthorId} AND Content = ${content}`)
    return await articleId;
};

async function linkImageToArticle(fileInfo) {
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    const filePath = newFileName;
    await addImageToSQL(fileInfo, filePath);
    fs.renameSync(oldFileName, newFileName);
};

async function addImageToSQL(filePath) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(2);    
    await db.run(SQL`
     INSERT INTO Images (ImageURL, ArticleID) VALUES (${filePath}, ${ArticleID})
      `);
}

async function getMostRecentArticle(AuthorId) {
    const db = await dbPromise;
    const result = await db.get(SQL`
        SELECT ArticleID from Articles WHERE
        UserID = ${AuthorId} ORDER BY ArticleID desc
    `);
    const articleId = result.ArticleID
    return await articleId;
}



module.exports = {
    createPost,
    retrieveSingleArticleId,
    linkImageToArticle
};