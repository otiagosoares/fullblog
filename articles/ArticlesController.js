const express = require('express')
const Router = express.Router()

Router.get('/articles', (req, res)=>{
    res.send('Articles')
})


module.exports = Router