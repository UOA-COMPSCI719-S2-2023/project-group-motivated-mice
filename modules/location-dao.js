const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");



async function retrieveLocationById(id) {
    const db = await dbPromise;

    const data = await db.get(SQL`
        select * from Location
        where LocationID = ${id}`);

    return data;
}

async function retrieveAllLocations() {
    const db = await dbPromise;

    const allData = await db.all(SQL`select * from Location`);

    return allData;
}

async function retrieveTopLocations() {
    const db = await dbPromise;

    const allData = await db.all(SQL`select * from Location Order By Likes DESC`);

    return allData;
}

async function retrieveArticlesByLocationId(id) {
    const db = await dbPromise;

    const data = await db.all(SQL`
        select * from Articles
        where LocationID = ${id}`);

    return data;
}



// Export functions.
module.exports = {
retrieveLocationById,
retrieveAllLocations,
retrieveTopLocations,
retrieveArticlesByLocationId,
};
