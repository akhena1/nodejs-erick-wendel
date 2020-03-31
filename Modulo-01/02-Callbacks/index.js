/* 
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir de seu id
 2 Obter endereço do usuario pelo Id
*/

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return  callback(null, {
            telefone:'910203040',
            ddd: 11
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}
function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false
    if(error) {
        console.error('DEU RUIM EM USUARIO', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('DEU RUIM EM TELEFONE', error1)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('DEU RUIM EM ENDERECO', error2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereço: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
})