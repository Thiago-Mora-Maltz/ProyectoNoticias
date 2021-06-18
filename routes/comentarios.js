var express = require('express');
var router = express.Router();
const service = require('../models/comentarios');
const { secureUser } = require('../middlewares');

comentarios = (req, res) => {
    service.getComentarios({id_noticia : req.params.id})
    .then((response) => res.json(response))
    .catch((e)=> res.json({ e }));
}
agregarComentario = async (req, res) => {
    const obj = ({foto_usuario,	usuario,id_noticia,	comentario} = req.body)
    service.postComentario(obj)
    .then((response) => res.json(response))
    .catch((e)=> res.json({ e }))
}

eliminar = async (req,res) => {
    await service.deleteComentario(req.params.id)
    .then((response) => res.json(response))
    .catch((e) => res.json(e))
}
router.get('/:id', comentarios)
router.post('/',secureUser ,agregarComentario)
router.delete('/:id',secureUser ,eliminar)

module.exports = router