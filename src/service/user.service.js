const connection = require("../app/database")

class userService {
    async create(user) {
        const { name, password } = user
        const statement = `INSERT INTO user ( name,password ) VALUES (?,?);`
        const result = await connection.execute(statement, [name, password])
        return result[0]
    }
    async getUserName(name) {
        // const {name} = user
        const statement = `SELECT * FROM user where name = ?;`
        const result = await connection.execute(statement, [name])
        // console.log(result[0]);
        return result[0]

    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
}

module.exports = new userService()