const db = require('../../../db')
const bcrypt = require('bcrypt-nodejs')
const sgMail = require('@sendgrid/mail')

module.exports = {
    Query: {
        async stores() {
            return await db('stores')
        },

        async store(_, { filter }) {
            if (filter.id) {
                return await db('stores').where({ id: filter.id }).first()
            } else if (filter.email) {
                return await db('stores').where({ email: filter.email }).first()
            }
        },
    },
    Mutation: {
        async createStore(_, { data }) {
            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)
            const store = { ...data }
            try {
                sgMail.setApiKey(process.env.SENDGRID_KEY)
                const msg = {
                    to: data.email,
                    from: 'Adove <adove@fedratecnologia.com.br>', //TODO: trocar email
                    subject: 'E-mail de boas vindas',
                    templateId: 'd-2cb6904425754175930c50e05667f464'
                }
                await sgMail.send(msg)
            } catch (e) {
                console.log(e)
            }
            return await (await db('stores').insert(store).returning("*"))[0]
        },

        async loginStore(_, { data }) {
            const store = await db('stores').where({ email: data.email }).first()
            if (!store) {
                return null
            }
            const valid = await bcrypt.compareSync(data.password, store.password)
            if (!valid) {
                return null
            }
            return store
        },

        async updateStore(_, { id, data }) {
            const store = await db('stores').where({ id }).first()
            if (store) {
                const updateStore = { ...store, ...data }
                await db('stores').where({ id }).update(updateStore)
                return updateStore
            }
            return 'Usuário não encontrado'
        },

        async deleteStore(_, { filter }) {
            if (filter.id) {
                return await db('stores').where({ id: filter.id }).delete()
            }
        }
    },
}