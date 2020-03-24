const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')

const port = 3200

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Controllres
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

//Models
const Category = require('./categories/Category')
const Article = require('./articles/Article')




//connection DATABASE
connection
    .authenticate()
    .then( () => {
        console.log('Connected on Data Base')
    }).catch((error) => {
        console.error(error)        
    })

app.use('/', categoriesController)
app.use('/', articlesController)


app.get('/', (req, res) => {

	Article.findAll({
		order: [
			['id', 'DESC']
		]
	}).then( articles => {
		res.render('index', {articles: articles})
	})
    
})

app.get('/:slug', (req, res) => {

	var slug = req.params.slug

	Article.findOne({
		where: {
			slug: slug
		}
	}).then( article => {
		if(article != undefined){
			res.render("article", { article: article })
		}else{
			res.redirect('/')
		}
	}).catch(e => {
		res.redirect('/')
	})
    
})



app.listen(port, () => {
    console.log('App is Running on port ' + port)
})