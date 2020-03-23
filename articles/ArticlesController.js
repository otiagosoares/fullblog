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