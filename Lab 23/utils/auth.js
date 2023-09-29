class JsonUserRepository {
    static #users = require('../users.json');

    static findUser(username) {
        return this.#users.find(user => user.username === username);
    }
}

class MySqlUserRepository {
    static #users = require('../db').models.User;

    static async findUser(username) {
        return this.#users.findOne({ where: { username } });
    }

    static async addUser(user) {
        return this.#users.create(user);
    }
}

module.exports = {
    JsonUserRepository,
    MySqlUserRepository
}