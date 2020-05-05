const db = require('../database/dbConfig');

function findById(userId) {
    return db('users').where({ id: userId }).first();
}

function findBy(filter) {
    return db('users').where(filter);
}

async function createUser(newUser) {
    const [id] = await db('users').insert(newUser, 'id');

    return findById(id);
}

async function getUsers() {
    return db('users');
}

module.exports = {
    createUser,
    findById,
    findBy,
    getUsers,
};
