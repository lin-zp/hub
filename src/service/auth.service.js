const connection = require("../app/database")

class authService{
    async verifyPassword(name){
        const statement = `SELECT password FROM user WHERE NAME = ?;`
        const result = await connection.execute(statement,[name])
        return result
    }
    
    async checkResource(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
        const result = await connection.execute(statement, [id, userId]);
        // console.log(result[0]);
        return result[0].length === 0 ? false: true;
      }
}

module.exports = new authService()