// docker ps
// winpty docker exec -it 3e0c5827facb mongo -u akhena -p minhasenhasecreta --authenticationDatabase herois

/* show dbs //databases
use herois //mudando contexto para uma database específica
show collections //mostra as coleções de documentos */


for(let i=0; i<= 10; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}


db.herois.count()


// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.findOne()
db.herois.find().limit(5).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })
db.herois.find()
db.herois.find().pretty()

//update

    // substitui o objeto inteiro
db.herois.update({ 
    _id: ObjectId("5e8cc671e812e352a39c4f73") 
},{
    nome: 'Mulher maravilha'
})

db.herois.update({
    _id: ObjectId("5e8cc7c6e812e352a39c4f7e")
}, {
    $set: {nome: 'Lanterna verde'}
})

// delete

db.herois.remove({}) // apaga tudo
db.herois.remove({nome: 'Mulher maravilha'})

