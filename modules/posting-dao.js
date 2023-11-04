const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function addImageToSQL(namesOfImage, userID, thumbnailName) {
    const db = await dbPromise;
    const ArticleID = await getMostRecentArticle(userID);
    //Looping the list of names of images to link image to an Article ID
    for await (const name of namesOfImage) {
        db.run(SQL`insert into Images (imageURL, ArticleID) VALUES (${name}, ${ArticleID})`);
    }
    await assignLastImgAsThumbnail(ArticleID, thumbnailName);
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

async function retrieveArticlesByUser(userID) {
    const db = await dbPromise;
    const articles = await db.all(SQL`
    SELECT * 
        FROM Articles 
        WHERE UserID = ${userID}`);
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



async function retrieveAllThumbnails(articleId) {
    const db = await dbPromise;
    const thumbnails = await db.all(SQL`
    SELECT * 
    FROM Images 
    WHERE Thumbnail IS NOT NULL`);
    return thumbnails;
}

async function getUserByArticle(articleId) {
    const db = await dbPromise;
    const userId = await db.get(SQL`
    SELECT UserID
    FROM Articles
    WHERE ArticleID = ${articleId}
    `);
    return userId;
}

async function deletePrevImages(articleId) {
    const db = await dbPromise;
    await db.run(SQL`
    DELETE FROM Images
    WHERE 
    ArticleID = ${articleId}
    `);
}

async function updateImageSQL(articleId, namesOfImage, thumbnailName) {
    const db = await dbPromise;
    //Looping the list of names of images to link image to an Article ID
    for await (const name of namesOfImage) {
        db.run(SQL``);
    }
    await assignLastImgAsThumbnail(ArticleID, thumbnailName);
}

module.exports = {
    addImageToSQL,
    getMostRecentArticle,
    retrieveSingleArticleId,
    getImagesFromId,
    retrieveAllArticles,
    retrieveTitlesOfAllArticles,
    assignLastImgAsThumbnail,
    retrieveAllThumbnails,
    retrieveArticlesByUser,
    getUserByArticle,
    deletePrevImages
};