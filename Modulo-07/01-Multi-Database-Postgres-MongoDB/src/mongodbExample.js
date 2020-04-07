const Mongoose = require('mongoose');
Mongoose.connect('mongodb://akhena:minhasenhasecreta@192.168.99.101:27017/herois', 
    {useNewUrlParser: true, useUnifiedTopology: true}, error => {
        if(!error) return;
        console.log('Falha na conexão: ', error)
    })
const connection = Mongoose.connection



connection.once('open', () => console.log('database rodando!!'))

const state = connection.readyState 
// 0 Desconectado
// 1 Conectado
// 2 Conectando
// 3 Desconectando
console.log('state: ', state)

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar: ', resultCadastrar)

    const listItems = await model.find()
    console.log('items' , listItems)
}
main()