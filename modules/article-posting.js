const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


async function createPost(AuthorId, content, title) {
    const db = await dbPromise;

    await db.run(SQL`
        INSERT INTO articles (UserID, Content, Title, Likes, PublishDate)
        VALUES(${AuthorId}, ${content}, ${title}, 0, datetime('now'))`);
}

module.exports = {
    createPost
};