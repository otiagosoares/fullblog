const express = require('express')
const Router = express.Router()
const Category = require('../categories/Category')

const pathURL = '/admin/articles'

const pathViews = 'admin/articles/'


Router.get(pathURL + '/new', (req, res)=>{

	Category.findAll().then( categories => {
		res.render(pathViews + '/new', {categories: categories})
	})

})


module.exports = Router