const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addImageToSQL(namesOfImage, userID, thumbnailName) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(userID);
    //Looping the list of names of images to link image to an Article ID
    for await (const name of namesOfImage) {
        console.log("🚀 ~ file: posting-dao.js:9 ~ forawait ~ namesOfImage:", namesOfImage)
        db.run(SQL`insert into Images (imageURL, ArticleID) VALUES (${name}, ${ArticleID})`);
    }
    // await assignLastImgAsThumbnail(ArticleID, thumbnailName);
}

async function getMostRecentArticle(userID) {
    const db = await dbPromise;
    const result = await db.get(SQL`SELECT ArticleID from Articles WHERE
    UserID = ${userID} ORDER BY ArticleID desc`);
    const articleId = result.ArticleID
    return await articleId;
}
async function assignLastImgAsThumbnail(articleId, thumbnailName) {
    const db = await dbPromise;
    await db.run(SQL`
    UPDATE Images
    SET Thumbnail = ${articleId} 
    WHERE 
        ArticleID = ${articleId}  AND ImageURL = ${thumbnailName}`
    );

}
async function getImagesFromId(articleId) {
    const db = await dbPromise;
    const image = await db.all(SQL`SELECT * FROM Images WHERE ArticleID = ${articleId}`)
    return await image;
}

async function retrieveSingleArticleId(AuthorId, content) {
    const db = await dbPromise;
    const articleId = await db.get(SQL`SELECT ArticleID FROM Articles WHERE UserID = ${AuthorId} AND Content = ${content}`)
    return await articleId;
};
async function retrieveAllArticles() {
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from Articles`);
    return await articles;
}

async function retrieveTitlesOfAllArticles() {
    const db = await dbPromise;
    const titles = await db.all(SQL`select Title from Articles`);
    const array = [];
    titles.forEach(function (title) {
        array.push(title);
    })
    return array;
}



async function getLastImageOfArticle(articleId) {
    const db = await dbPromise;



}

module.exports = {
    addImageToSQL,
    getMostRecentArticle,
    retrieveSingleArticleId,
    getImagesFromId,
    retrieveAllArticles,
    retrieveTitlesOfAllArticles,
    assignLastImgAsThumbnail

};