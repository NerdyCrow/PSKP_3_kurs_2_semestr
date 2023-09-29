const users = require('../users.json');

function verifyUser(username, password) {
    const user = findUser(username);

    return user?.password === password;
}

function findUser(username) {
    return users.find(user => user.username === username);
}

module.exports = {
    verifyUser,
    findUser
}