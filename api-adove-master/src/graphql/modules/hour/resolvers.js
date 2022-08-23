const db = require('../../../db')

module.exports = {
    Query: {
        async hours(_, { filter }) {
           return await db('hours')
           .whereNotExists(db.select('*').from('events')
           .whereRaw('hours.id = events.hour')
           .andWhereRaw('events.date = ?', [filter.date])
           .andWhereRaw('events.store = ?', [filter.store])
           )
        },
        async hour(_, { filter }) {
            if (filter.id) {
                return await db('hours').where({ id: filter.id }).first()
            }
        },
    },
    Mutation: {
        async createHour(_, { data }) {
            const hour = { ...data }
            return await (await db('hours').insert(hour).returning('*'))[0]
        },

        async updateHour(_, { id, data }) {
            const hour = await db('hours').where({ id }).first()
            if (hour) {
                const updateHour = { ...hour, ...data }
                await db('hours').where({ id }).update(updateHour)
                return updateHour
            }
            return 'Usuário não encontrado'
        },

        async deleteHour(_, { filter }) {
            if (filter.id) {
                return await db('hours').where({ id: filter.id }).delete()
            }
        }
    },
}
