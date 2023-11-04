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

async function retrieveArticle(articleId) {
    const db = await dbPromise;
    const article = await db.get(SQL`select * from Articles where ArticleID = ${articleId}`);
    return await article;
}

//not complete yet
function addThumbnail(articleArray, thubnailArray) {
    for (let i = 0; i < articleArray.length; i++) {
        let j = 0;
        let testing = articleArray[i].prototype.replace("}", "");
        console.log("🚀 ~ file: read-article.js:16 ~ addThumbnail ~ testing:", testing)
        let testingArray = [];
        if (articleArray[i].ArticleID == thubnailArray[j].ArticleID) {
            articleArray[i].ArticleID;
        }
        j++;
    }
}



module.exports = {
    createPost,
    retrieveSingleArticleId,
    retrieveArticle
};