const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


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

    const account = await db.get(SQL`
        select * from Account
        where UserName = ${username} and HashedPassword = ${password}`);

    return account;
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
/**
 * updates the user with an auth token.
 */

async function updateAccount(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update Account
        set UserName = ${user.username}, HashedPassword = ${user.password}, AuthToken = ${user.authToken}
        where AccountID = ${user.id}`);
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

// Export functions.
module.exports = {
    retrieveAccountById,
    retrieveAccountWithCredentials,
    retrieveUserWithAuthToken,
    retrieveAccountByUsername,
    retrieveAllAccounts,
    updateAccount,
    deleteAccount
};
