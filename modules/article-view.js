const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function viewPost (articleId){
    const db = await dbPromise;
    const article = await db.get(SQL`select * from Articles where ArticleID = ${articleId}`);
    console.log("🚀 ~ file: article-view.js:8 ~ viewPost ~ article:", article)

    return await article;
}
module.exports = {
    viewPost
};