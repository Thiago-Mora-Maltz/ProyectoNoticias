var express = require('express')
var router = express.Router()
const multer = require('multer')
const config = { dest: './public/tmp' }
const upload = multer(config)
const noticiasModel = require('./../../models/noticias')
const imageHandler = require('../../public/images/imageHandler')
const uuid = require('node-uuid')

//Posteo, modificacion o eliminacion de noticias

router.post('/', upload.single('foto'), async (req, res) => {
  try {
    console.log('estoy en el Try del post')
    const uid = uuid()
    const { titulo, resumen, parrafo, categoria } = req.body //AGREGAR FECHA PUBLICACION
    const name = imageHandler.saveImage(req.file)
    const data = {
      id_noticia: uid,
      titulo,
      resumen,
      parrafo,
      categoria,
      foto: name,
      archivo: `./../../public/images/${name}`, ///cambiar esto
    }
    console.log(data)
    let result = await noticiasModel.postNoticia(data)
    res.json({ status: true, noticia: result })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const obj = {
      titulo: req.body.titulo,
      resumen: req.body.resumen,
      parrafo: req.body.parrafo,
      categoria: req.body.categoria,
      foto: req.body.foto,
    }
    let result = await noticiasModel.updateNoticia(req.params.id, obj)
    res.json({ status: true, noticia: result })
  } catch (error) {
    res.sendStatus(500)
  }
})

eliminar = async (req, res) => {
  await noticiasModel
    .deleteNoticia(req.params.id)
    .then((respuesta) => res.json(respuesta))
    .catch((error) => res.json(error))
}
router.delete('/:id', eliminar)
module.exports = router
