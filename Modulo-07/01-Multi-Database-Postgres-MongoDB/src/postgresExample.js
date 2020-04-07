//  npm install sequelize
//  npm install pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'akhena',
    'minhasenha',
    {
        host: '192.168.99.101',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true,
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()

    await Herois.create({
        nome: 'Lanterna verde',
        poder: 'Anel'
    })

    const result = await Herois.findAll({ raw: true })
    console.log('result: ', result)

}

main()