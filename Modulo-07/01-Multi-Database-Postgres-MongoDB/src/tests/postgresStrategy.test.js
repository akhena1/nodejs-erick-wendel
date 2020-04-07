/* const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gaviao Negro', 
    poder: 'Flechas' 
}
const MOCK_HEROI_ATUALIZAR = { 
    nome: 'BATMAN', 
    poder: 'dinheiro' 
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async  () => {
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('Postgres SQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        console.log('result: ', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id

        // pegar a primeira posição
        // const posicaoZero = result[0]

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)

    })
    it('remover por id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
}) */