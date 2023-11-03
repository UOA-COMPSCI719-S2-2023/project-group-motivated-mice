const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addImageToSQL(namesOfImage, userID) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(userID);
    //Looping the list of names of images to link image to an Article ID
    for await (const name of namesOfImage) {
        db.run(SQL`insert into Images (imageURL, ArticleID) VALUES (${name}, ${ArticleID})`);
    } 
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

async function retrieveSingleArticleId(AuthorId, content) {
    const db = await dbPromise;
    const articleId = await db.get(SQL`SELECT ArticleID FROM Articles WHERE UserID = ${AuthorId} AND Content = ${content}`)
    return await articleId;
};

module.exports = {
    addImageToSQL,
    getMostRecentArticle,
    retrieveSingleArticleId,
    getImageFromId
    
};