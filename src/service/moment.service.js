const connection = require('../app/database')

class momentService  {
    async create(userId, content){
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        // console.log("动态数据写入中……");
        const result = connection.execute(statement,[content, userId])
        // console.log("动态数据写入完成");
        return result;
    }

    async getMomentList(offset,size){

        const statement = `select m.id id, m.content content, m.createAt createTime, m.updateAt updateTime
                                from moment m
                                limit ?,? ;`

        const result = connection.execute(statement,[offset,size])
        return result;
    }

    async getMomentById(momentId){
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime
                                from moment m
                                where m.id = ?`

        const result = connection.execute(statement,[momentId])
        return result;
    }

    async update(content, momentId){
        const statement = `update moment set content = ? where id = ?; `

        const result = connection.execute(statement,[content, momentId])
        return result;
    }

    async remove(momentId){
        const statement = `delete from moment where id = ?;`

        const result = connection.execute(statement,[momentId])
        return result
    }
}

module.exports = new momentService()