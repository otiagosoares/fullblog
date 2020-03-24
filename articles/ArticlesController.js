const express = require('express')
const Router = express.Router()

const slugify = require('slugify')

const Category = require('../categories/Category')
const Article = require('./Article')

const pathURL = '/admin/articles'
const pathViews = 'admin/articles/'

Router.get(pathURL, (req, res)=>{

	Article.findAll({
		include: [{model: Category}]
	}).then( articles => {

		res.render(pathViews, {articles: articles})

	})
})

Router.get(pathURL + '/new', (req, res) => {

	Category.findAll().then( categories => {
		res.render(pathViews + '/new', {categories: categories})
	})

})

Router.get(pathURL + '/edit/:id', (req, res) => {

	var id = req.params.id
		 
	Article.findByPk(id, {
		include: [{model: Category}]
	} ).then( article => {
		res.render(pathViews + '/edit', {article: article})
	})

})

Router.post('/articles/delete/', (req, res) => {

    var idArticle = req.body.id

    if(idArticle != undefined && !isNaN(idArticle)){

        Article.destroy({ 
            where: {id: idArticle}
        })
        .then(()=>{
            res.redirect(pathURL)
        })

    }else{

        res.redirect(pathURL)
        
    }
        
})


Router.post(pathURL + '/save', (req, res) => {

	var title = req.body.title
	var body = req.body.body
	var slug = slugify( title )
	var categoryId = req.body.category

	Article.create({

		title: title,
		slug: slug.toLowerCase(),
		body: body,
		categoryId: categoryId

	}).then(() => {
		res.redirect(pathURL)
	})
})


module.exports = Router