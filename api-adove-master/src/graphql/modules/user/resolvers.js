const db = require('../../../db')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    Query: {
        async users() {
            return await db('users')
        },

        async user(_, { filter }) {
            if (filter.id) {
                return await db('users').where({ id: filter.id }).first()
            } else if (filter.email) {
                return await db('users').where({ email: filter.email }).first()
            }
        },
    },
    Mutation: {
        async createUser(_, { data }) {
            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)
            const user = { ...data }
            return await (await db('users').insert(user).returning("*"))[0]
        },

        async loginUser(_, { data }) {
            const user = await db('users').where({ email: data.email }).first()
            if (!user) {
                return null
            }
            const valid = await bcrypt.compareSync(data.password, user.password)
            if (!valid) {
                return null
            }
            return user
        },

        async updateUser(_, { id, data }) {
            const user = await db('users').where({ id }).first()
            if (user) {
                const updateUser = { ...user, ...data }
                await db('users').where({ id }).update(updateUser)
                return updateUser
            }
            return 'Usuário não encontrado'
        },

        async deleteUser(_, { filter }) {
            if (filter.id) {
                return await db('users').where({ id: filter.id }).delete()
            } else if (filter.email) {
                return await db('users').where({ email: filter.email }).delete()
            }
        },
    }
}
