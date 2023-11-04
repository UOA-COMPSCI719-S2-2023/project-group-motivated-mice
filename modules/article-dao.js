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

//Get the top articles according to the likes from the database
//If there is no likes yet, it will retrn all articles
async function retrieveTopArticles() {
    const db = await dbPromise;

    let topArticles = await db.all(SQL`
        SELECT * FROM Articles 
        WHERE Likes > 0
        ORDER BY Likes DESC 
        LIMIT 10
    `);

    if (topArticles.length === 0) {
        topArticles = await db.all(SQL`SELECT * FROM Articles LIMIT 10`);
    }

    return topArticles;
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
    const articleID = result.ArticleID
    return await articleID;
}
async function assignLastImgAsThumbnail(articleID, thumbnailName) {
    const db = await dbPromise;
    await db.run(SQL`
    UPDATE Images
    SET Thumbnail = ${articleID} 
    WHERE 
        ArticleID = ${articleID}  AND ImageURL = ${thumbnailName}`
    );

}
async function getImagesFromId(articleID) {
    const db = await dbPromise;
    const image = await db.all(SQL`SELECT * FROM Images WHERE ArticleID = ${articleID}`)
    return await image;
}

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


async function retrieveAllThumbnails() {
    const db = await dbPromise;
    const thumbnails = await db.all(SQL`
    SELECT * 
    FROM Images 
    WHERE Thumbnail IS NOT NULL`);
    return thumbnails;
}

async function getUserByArticle(articleID) {
    const db = await dbPromise;
    const userId = await db.get(SQL`
    SELECT UserID
    FROM Articles
    WHERE ArticleID = ${articleID}
    `);
    return userId;
}

async function deletePrevImages(articleID) {
    const db = await dbPromise;
    await db.run(SQL`
    DELETE FROM Images
    WHERE 
    ArticleID = ${articleID}
    `);
}

async function updateImageSQL(namesOfImage, ArticleID, thumbnailName) {
    const db = await dbPromise;
    //Looping the list of names of images to link image to an Article ID
    for await (const name of namesOfImage) {
        db.run(SQL`insert into Images (imageURL, ArticleID) VALUES (${name}, ${ArticleID})`);
    }
    await assignLastImgAsThumbnail(ArticleID, thumbnailName);
}

async function getAllImagesOfArticle(ArticleID) {
    const db = await dbPromise;
    const images = await db.all(SQL`
    SELECT *
    FROM Images
    WHERE 
    ArticleID = ${ArticleID}
    `);
    return await images;
}

async function updateArticleDetails(ArticleID, Title, Content) {
    const db = await dbPromise;
    await db.run(SQL`
    UPDATE Articles
    SET Title = ${Title},
        Content = ${Content}
    WHERE
    ArticleID = ${ArticleID}
    `);
}

async function deleteArticle(ArticleID) {
    const db = await dbPromise;
    await db.run(SQL`
    DELETE FROM Articles
    WHERE
    ArticleID = ${ArticleID}
    `);
}





module.exports = {
    createPost,
    retrieveSingleArticleId,
    retrieveArticle,
    retrieveTopArticles,
    addImageToSQL,
    getMostRecentArticle,
    getImagesFromId,
    retrieveAllArticles,
    retrieveTitlesOfAllArticles,
    assignLastImgAsThumbnail,
    retrieveAllThumbnails,
    retrieveArticlesByUser,
    getUserByArticle,
    deletePrevImages,
    updateImageSQL,
    getAllImagesOfArticle,
    updateArticleDetails,
    deleteArticle
};