const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

const bcrypt = require("bcrypt");
/**
 * Gets the account with the given id from the database.
 * If there is no such account, undefined will be returned.
 * 
 * @param {number} id the id of the account to get.
 */
async function retrieveAccountById(id) {
    const db = await dbPromise;

    const account = await db.get(SQL`
        select * from Account
        where AccountID = ${id}`);

    return account;
}

/**
 * Gets the account with the given username and password from the database.
 * If there is no such account, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */
async function retrieveAccountWithCredentials(username, password) {
    const db = await dbPromise;

    //First, get the user with the given username
    const account = await db.get(SQL`
        select * from Account
        where UserName = ${username}`);

    //If we have an account, compare the input password with the hashed password
    if (account && bcrypt.compareSync(password, account.HashedPassword)) {
        // If the passwords match, return the account
        return account;
    } else {
        // If the passwords don't match or the account doesn't exist, return null
        return null;
    }
    
}

async function retrieveAccountIDWithCredentials(username, password) {

    const db = await dbPromise;
    console.log(username);
    return await db.run(SQL`
        select AccountID from Account
        where UserName = ${username} AND HashedPassword = ${password}`);
 }

/**
 * Gets the account with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the account's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const account = await db.get(SQL`
        select * from Account
        where authToken = ${authToken}`);

    return account;
}

/**
 * Gets the account with the given username from the database.
 * If there is no such account, undefined will be returned.
 * 
 * @param {string} username the account's username
 */
async function retrieveAccountByUsername(username) {
    const db = await dbPromise;

    const account = await db.get(SQL`
        select * from Account
        where UserName = ${username}`);

    return account;
}

/**
 * Gets an array of all accounts from the database.
 */
async function retrieveAllAccounts() {
    const db = await dbPromise;

    const accounts = await db.all(SQL`select * from Account`);

    return accounts;
}

async function retrieveTopAccounts() {
    const db = await dbPromise;

    const accounts = await db.all(SQL`select * from Account Order By Likes DESC Limit 5`);

    return accounts;
}
/**
 * updates the user with an auth token.
 */

async function updateAccount(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update Account
        set UserName = ${user.UserName}, HashedPassword = ${user.HashedPassword}, AuthToken = ${user.authToken}
        where AccountID = ${user.AccountID}`);
}


/**
 * Deletes the account with the given id from the database.
 * 
 * @param {number} id the accounts's id
 */
async function deleteAccount(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from Account
        where id = ${id}`);
}


async function retrieveAvatarById(id) {
    const db = await dbPromise;

    const avatar = await db.get(SQL`
        select * from Avatar
        where AvatarID = ${id}`);

    return avatar;
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
    retrieveAccountById,
    retrieveAccountWithCredentials,
    retrieveAccountIDWithCredentials,
    retrieveUserWithAuthToken,
    retrieveAccountByUsername,
    retrieveAllAccounts,
    retrieveTopAccounts,
    updateAccount,
    deleteAccount,
    retrieveAvatarById,
    createAcountData,
    retrieveUserName,
    retrieveAllAvatars
};
