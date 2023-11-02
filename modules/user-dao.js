const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Get the user(account) with the given id from the database
async function retrieveAccountById(id) {
    const db = await dbPromise;

    const account = await db.get(SQL`
        select * from Account
        where AccountID = ${id}`);

    return account;
}

async function retrieveAvatarById(id) {
    const db = await dbPromise;

    const avatar = await db.get(SQL`
        select * from Account
        where AccountID = ${id}`);

    return avatar;
}

//Get the article with the given userId from the database
async function retrieveArticlesById(id) {
    const db = await dbPromise;

    const articles = await db.get(SQL`
        select * from Articles
        where UserID = ${id}`);

    return articles;
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

// Export functions.
module.exports = {
    retrieveAccountById,
    retrieveAvatarById,
    retrieveArticlesById,
    retrieveTopArticles
};


