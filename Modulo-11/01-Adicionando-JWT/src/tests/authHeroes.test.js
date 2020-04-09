const assert = require('assert')
const api = require('../api')
let app = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU4NjQ2ODI3Mn0.XgA8i0J_oEDFfTRw0snU6OksfiB7Z3DuUEEENL_pmME'

describe('Suíte de testes de autorização', function() {
    this.beforeAll(async () => {
        app = await api
    })

    it('Deve obter um token', async () => {
        const result  = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'Xuxadasilva',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})