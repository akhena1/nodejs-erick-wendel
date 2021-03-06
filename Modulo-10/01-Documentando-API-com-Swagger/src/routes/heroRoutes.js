const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const failAction = (request, headers, erro) => {
    throw erro;
}
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }
    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar herois',
                notes: "Pode paginar resultados e filtrar por nome",
                validate: {
                    // payload -> body
                    // headers -> header
                    // params -> URL
                    // query -> ?skip=0&limt=10
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    const query = {
                        nome: { $regex: `.*${nome}*.` }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (error) {
                    console.error('deu ruim: ', error)
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar herois',
                notes: "Cadastra heroi com nome e poder",
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                } catch (error) {
                    console.error('deu ruim: ', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar herois',
                notes: "Atualiza um ou mais atributos do heroi",
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params
                    const { payload } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.nModified !== 1) return Boom.preconditionFailed('Id nao encontrado no banco')

                    return {
                        message: 'Heroi atualizado com sucesso'
                    }

                } catch (error) {
                    console.error('deu ruim:', error)
                    return Boom.internal()
                }
            }
        }
    }
    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve deletar herois',
                notes: "Deleta um heroi pelo seu ID",
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params
                    const result = await this.db.delete(id)
                    if (result.n !== 1) 
                        return  Boom.preconditionFailed('ID Não encontrado no banco!')

                        return {
                            message: "Heroi removido com sucesso"
                        }
                } catch (error) {
                    console.error('DEU RUIM: ', error)
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroRoutes