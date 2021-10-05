const Sequelize = require('sequelize');

const sequelize = new Sequelize('banco', 'root', '123abc', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log("Conexão com o bd estabelecida.");
}).catch(() => {
    console.log("Erro: Conexão não estabelecida.")
});

module.exports = sequelize;