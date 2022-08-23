const db = require('../../../db')

module.exports = {
    Event: {
        user(args) {
            return db('users').where({ id: args.user }).first()
        },
        job(args) {
            return db('jobs').where({ id: args.job }).first()
        },
        hour(args) {
            return db('hours').where({ id: args.hour }).first()
        },
        store(args) {
            return db('stores').where({ id: args.store }).first()
        },
    },
    Query: {
        async events(_, { filter }) {
            if (filter.store) {
                return await db('events').where({ store: filter.store }).orderBy('date')
            } else if(filter.user) {
                return await db('events').where({ user: filter.user }).orderBy('date')
            }
        },

        async event(_, { filter }) {
            if (filter.id) {
                return await db('events').where({ id: filter.id }).first()
            }
        },
    },
    Mutation: {
        async createEvent(_, { data }) {
            const event = { ...data }
            return await (await db('events').insert(event).returning('*'))[0]
        },

        async updateEvent(_, { id, data }) {
            const event = await db('events').where({ id }).first()
            if (event) {
                const updateEvent = { ...event, ...data }
                await db('events').where({ id }).update(updateEvent)
                return updateEvent
            }
            return 'Usuário não encontrado'
        },

        async deleteEvent(_, { filter }) {
            if (filter.id) {
                return await db('events').where({ id: filter.id }).delete()
            }
        }
    },
}
