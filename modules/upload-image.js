// const SQL = require("sql-template-strings");
// const dbPromise = require("./database.js");
const fs = require("fs");
const jimp = require("jimp");
const postingDao = require("./posting-dao.js");

async function linkImageToArticle(images, userId) {
    makeUserFolder(userId);
    //adding images to the user's folder
    images.forEach(element => {
        const oldFileName = element.path;
        const newFileName = `./public/images/${userId}/${element.originalname}`;
        fs.renameSync(oldFileName, newFileName);
    });
    let fileNames = fs.readdirSync(`./public/images/${userId}`);
    await postingDao.addImageToSQL(fileNames, userId);

};

async function makeUserFolder(userID) {
    const folderName = `./public/images/${userID}`;
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
}

// async function addImageToSQL(namesOfImage, userID) {
//     const db = await dbPromise;
//     const ArticleID = await getMostRecentArticle(userID);
//     //Looping the list of names of images to link image to an Article ID
//     for await (const name of namesOfImage) {
//         db.run(SQL`insert into Images (imageURL, ArticleID) VALUES (${name}, ${ArticleID})`);
//     } 
// }

// async function getMostRecentArticle(userID) {
//     const db = await dbPromise;
//     const result = await db.get(SQL`SELECT ArticleID from Articles WHERE
//     UserID = ${userID} ORDER BY ArticleID desc`);
//     const articleId = result.ArticleID
//     return await articleId;
// }

// async function getImageFromId(articleId) {
//     const db = await dbPromise;
//     const image = await db.get(SQL`SELECT * FROM Images WHERE ArticleID = ${articleId}`)
//     return await image;
// }

module.exports = {
    linkImageToArticle
};