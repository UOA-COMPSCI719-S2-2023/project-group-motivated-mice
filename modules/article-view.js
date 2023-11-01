const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function viewPost (articleId){
    const db = await dbPromise;
    const article = await db.get(SQL`select * from Articles where ArticleID = ${articleId}`);

    return await article;
}
module.exports = {
    viewPost
};