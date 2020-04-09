const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

//npm i  jsonwebtoken

const Jwt = require('jsonwebtoken')

const failAction = (request, headers, erro) => {
    throw erro;
}
const USER = {
    username: 'xuxadasilva',
    password: '123'
}

class AuthRoute extends BaseRoute {
    constructor(secret) {
        super()
    }
    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com o usuario e senha do banco de dados',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { username, password } = request.payload

                    if (
                        username.toLowerCase() !== USER.username ||
                        password !== USER.password
                    )
                        return Boom.unauthorized()

                    const token = Jwt.sign({
                        username: username,
                        id: 1
                    }, 'MinhaChaveSecretona')
                    return {
                        token
                    }
                } catch (error) {
                    console.error('deu ruim: ', error)
                }
            }
        }


    }

}

module.exports = AuthRoute