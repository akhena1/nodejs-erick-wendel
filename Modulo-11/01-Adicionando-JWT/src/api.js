// npm i hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MinhaChaveSecretona'

const app = new Hapi.Server({
    port: 3333
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))

    const swaggerOptions = { 
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            option: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 1200
        // },
        validate: (dado, request) => {
            //  verifica no banco se o usuario continua ativo
            // verifica no banco se o usuario continua pagando 

            return {
                isValid: true //caso nao valido é false
            }
        }
    })

    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(), AuthRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app
}
module.exports = main()