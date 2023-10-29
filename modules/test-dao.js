const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createTestData(testData) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into test (stuff) values(${testData.stuff})`);

    testData.id = result.lastID;
}

async function retrieveTestDataById(id) {
    const db = await dbPromise;

    const testData = await db.get(SQL`
        select * from test
        where id = ${id}`);

    return testData;
}

async function retrieveAllTestData() {
    const db = await dbPromise;

    const allTestData = await db.all(SQL`select * from test`);

    return allTestData;
}

async function updateTestData(testData) {
    const db = await dbPromise;

    return await db.run(SQL`
        update test
        set stuff = ${testData.stuff}
        where id = ${testData.id}`);
}

async function deleteTestData(id) {
    const db = await dbPromise;

    return await db.run(SQL`
        delete from test
        where id = ${id}`);
}

//store all data in database from the create account page
async function createAcountData(userDetails) {
    const db = await dbPromise;
    
    const result = await db.run(SQL`
        insert into Account(Username, HashedPassword, 
        FirstName, LastName, 
        DateOfBirth, EmailAddress, About, AvatarID)
        values
        (${userDetails.username}, ${userDetails.password}, 
        ${userDetails.firstName}, ${userDetails.lastName}, 
        ${userDetails.birthday}, ${userDetails.email}, 
        ${userDetails.des}, ${userDetails.avatar})
        `);

        return result.lastID; 
}

// code to check if the username exists in the database
async function retrieveUserName(username) {
    const db = await dbPromise;

    return await db.get(SQL`
        select UserName from Account 
        where UserName = ${username}`);

}

//to get all avatars from database
async function retrieveAllAvatars(){
    const db = await dbPromise;

    const avatars = await db.all(SQL`select * from Avatar`);

    return avatars;
}

// Export functions.
module.exports = {
    createTestData,
    retrieveTestDataById,
    retrieveAllTestData,
    updateTestData,
    deleteTestData,
    createAcountData,
    retrieveUserName,
    retrieveAllAvatars,
};
