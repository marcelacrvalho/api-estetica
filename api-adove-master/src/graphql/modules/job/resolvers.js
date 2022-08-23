const db = require('../../../db')

module.exports = {
    Job: {
        store(args) {
            return db('stores').where({ id: args.store }).first()
        }
    },
    Query: {
        async jobsSearch(_, { filter }) {
            if (filter.job) {
                return await db('jobs')
                .whereExists(db.select('*').from('stores')
                .where('jobs.job', 'ILike', `%${filter.job}%`)
                .andWhereRaw('stores.location = ?', [filter.location])
                )
            }
        },

        async jobsByStore(_, { filter }) {
            if (filter.store) {
                return await db('jobs').where({ store: filter.store })
            }
        },

        async jobsByLocation(_, { filter }) {
            return await db('jobs')
                .whereExists(db.select('*').from('stores')
                    .whereRaw('jobs.store = stores.id')
                    .andWhereRaw('stores.location = ?', [filter.location])
                    .andWhereRaw('stores.category = ?', [filter.category])
                )
        },

        async jobsByLocationAndDiscount(_, { filter }) {
            return await db('jobs')
                .whereExists(db.select('*').from('stores')
                    .whereRaw('jobs.store = stores.id')
                    .andWhereRaw('stores.location = ?', [filter.location])
                    .andWhereRaw('stores.category = ?', [filter.category])
                    .andWhereRaw('jobs.discount = true')
                )
        },

        async job(_, { filter }) {
            if (filter.id) {
                return await db('jobs').where({ id: filter.id }).first()
            }
        },
    },
    Mutation: {
        async createJob(_, { data }) {
            const job = { ...data }
            return await (await db('jobs').insert(job).returning('*'))[0]
        },

        async updateJob(_, { id, data }) {
            const job = await db('jobs').where({ id }).first()
            if (job) {
                const updateJob = { ...job, ...data }
                await db('jobs').where({ id }).update(updateJob)
                return updateJob
            }
            return 'Usuário não encontrado'
        },

        async deleteJob(_, { filter }) {
            if (filter.id) {
                return await db('jobs').where({ id: filter.id }).delete()
            }
        }
    },
}
