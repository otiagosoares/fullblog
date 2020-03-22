const express = require('express')
const Router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

const pathURL = '/admin/categories'

const pathViews = 'admin/categories/'

Router.get(pathURL, (req, res)=>{

   Category.findAll().then(categories =>{

    res.render(pathViews + 'index', { categories: categories})

   })    
})

Router.get(pathURL + '/new', (req, res)=>{
    res.render(pathViews + 'new')
})


//save new category
Router.post(pathURL + '/save', (req, res) => {

    var title = req.body.title
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect(pathURL)
        })

    }else{
        res.redirect(pathURL + '/new')
    }
})

Router.post(pathURL + '/delete', (req, res) => {

    var idCategorie = req.body.id

    if(idCategorie != undefined && isNaN(idCategorie)){
        Category.destroy({ 
            where: {id: idCategorie}
        })
        .then(()=>{
            res.redirect(pathURL)
        })
    }else{
        res.redirect(pathURL)
    }
        
})

module.exports = Router