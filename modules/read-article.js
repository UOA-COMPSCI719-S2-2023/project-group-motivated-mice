const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

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
    retrieveArticle,
    addThumbnail
};