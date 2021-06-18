var express = require('express');
var router = express.Router();
const noticiasModel = require('../models/noticias')

//Peticion de noticias

router.get('/', async(req,res)=>{
    try {
        let noticias = await noticiasModel.getAll()
        res.json(noticias)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/:id', async(req,res)=>{
    try {
        let noticia = await noticiasModel.getNoticia(req.params.id)
        res.json(noticia)
        
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router;
