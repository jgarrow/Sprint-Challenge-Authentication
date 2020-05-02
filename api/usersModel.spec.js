const db = require('../database/dbConfig');
const UserModel = require('./usersModel');

// it.todo('');
describe('users model', () => {
    describe('findById()', () => {
        it('returns a user object', async () => {
            const user = {
                username: 'jane',
                password: 'password',
            };
            // need to get the id for the test
            const expectedUser = await UserModel.createUser(user);
            const actualUser = await UserModel.findById(expectedUser.id);
            expect(actualUser).toEqual(expectedUser);
        });
    });
    describe('findBy()', () => {
        it('returns a user object based on the provided filter', async () => {
            const filter = { username: 'steve' };
            const expectedUser = await UserModel.createUser({
                username: 'steve',
                password: 'password',
            });
            const [actualUser] = await UserModel.findBy(filter);
            expect(actualUser).toEqual(expectedUser);
        });
    });
    describe('createUser()', () => {
        it('successfully adds a new user to the db', async () => {
            const users = await db('users');
            const newUser = {
                username: 'mark',
                password: 'password',
            };
            await UserModel.createUser(newUser);
            const updatedUsers = await db('users');
            expect(updatedUsers.length).toBe(users.length + 1);
        });
    });
});
