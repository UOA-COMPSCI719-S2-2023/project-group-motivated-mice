const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


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

module.exports = {
    createPost,
    retrieveSingleArticleId
};