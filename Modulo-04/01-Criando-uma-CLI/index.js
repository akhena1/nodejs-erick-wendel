const Commander = require('commander')
    , Database = require('./database')
    , Heroi = require('./heroi')
async function main() {
    Commander
        .version('v0.0.1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar um heroi")
        .option('-rmhero, --remover', "Remove um heroi por id")
        .option('-a, --atualizar [value]', "Atualiza um heroi por id")
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado!')
                return;
            }
            console.log('Heroi cadastrado com sucesso')
        }
        if(Commander.listar){
            const resultado = await Database.listar();
            console.log(resultado)
            return
        }
        if(Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possível remover o herói')
                return;
            }
            console.log('Herói removido com sucesso')
        }

        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remover todas as achaves que estiverem com undefined || null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possível atualizar o herói')
                return
            }
            console.log('Herói atualizado com sucesso')


        }
    } catch (error) {
        console.error('DEU RUIM: ', error)
    }
}
main()