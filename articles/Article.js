const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Um artigo pertence a uma categoria
Article.belongsTo(Category)

//Uma categoria tem muitos artigos
Category.hasMany(Article)

//Força criar a tabela no DB
//Article.sync({force: true})

module.exports = Article