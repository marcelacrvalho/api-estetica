const db = require('../../../db')

module.exports = {
    Query: {
        async publications() {
            return await db('publications').orderBy('id', 'desc')
        },

        async publication(_, { filter }) {
            if (filter.id) {
                return await db('publications').where({ id: filter.id }).first()
            } else if(filter.title) {
                return await db('publications').where({ title: filter.title }).first()
            }
        },
    },
    Mutation: {
        async createPublication(_, { data }) {
            const publication = { ...data }
            return await (await db('publications').insert(publication).returning('*'))[0]
        },

        async updatePublication(_, { id, data }) {
            const publication = await db('publications').where({ id }).first()
            if (publication) {
                const updatePublication = { ...publication, ...data }
                await db('publications').where({ id }).update(updatePublication)
                return updatePublication
            }
            return 'Publicação não encontrada'
        },

        async deletePublication(_, { filter }) {
            if (filter.id) {
                return await db('publications').where({ id: filter.id }).delete()
            }
        }
    },
}
