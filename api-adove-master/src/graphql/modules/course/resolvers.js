const db = require('../../../db')

module.exports = {
    Query: {
        async courses() {
            return await db('courses').orderBy('date')
        },

        async coursesByCity(_, { filter }) {
            if (filter.city) {
                return await db('courses').where({ city: filter.city }).orderBy('date')
            }
        },

        async coursesByAuthor(_, { filter }) {
            if (filter.author) {
                return await db('courses').where({ author: filter.author }).orderBy('date')
            }
        },

        async course(_, { filter }) {
            if (filter.id) {
                return await db('courses').where({ id: filter.id }).first()
            } else if(filter.title) {
                return await db('courses').where({ title: filter.title }).orderBy('date')
            }
        },
    },
    Mutation: {
        async createCourse(_, { data }) {
            const course = { ...data }
            return await (await db('courses').insert(course).returning('*'))[0]
        },

        async updateCourse(_, { id, data }) {
            const course = await db('courses').where({ id }).first()
            if (course) {
                const updateCourse= { ...course, ...data }
                await db('courses').where({ id }).update(updateCourse)
                return updateCourse
            }
            return 'Curso não encontrado'
        },

        async deleteCourse(_, { filter }) {
            if (filter.id) {
                return await db('courses').where({ id: filter.id }).delete()
            }
        }
    },
}
