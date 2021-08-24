const connection = require('../app/database')

class momentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        // console.log("动态数据写入中……");
        const result = await connection.execute(statement, [content, userId])
        // console.log("动态数据写入完成");
        return result;
    }

    async getMomentList(offset, size) {

        const statement = `select m.id id, m.content content, m.createAt createTime, m.updateAt updateTime
                                from moment m
                                limit ?,? ;`

        const result = await connection.execute(statement, [offset, size])
        return result;
    }

    async getMomentById(momentId) {
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime
                                from moment m
                                where m.id = ?`

        const result = await connection.execute(statement, [momentId])
        return result;
    }

    async update(content, momentId) {
        const statement = `update moment set content = ? where id = ?; `

        const result = await connection.execute(statement, [content, momentId])
        return result;
    }

    async remove(momentId) {
        const statement = `delete from moment where id = ?;`

        const result = await connection.execute(statement, [momentId])
        return result
    }

    async hasLabels(momentId, labelId) {
        const statement = `select * from moment_label where moment_id = ? and label_id = ?;`

        const [result] = await connection.execute(statement, [momentId, labelId])
        return result.length === 0 ? false : true
    }

    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`

        const result = await connection.execute(statement, [momentId, labelId])
        console.log("添加标签");
        return result[0]
    }
}

module.exports = new momentService()