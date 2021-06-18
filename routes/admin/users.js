const express = require('express')
const router = express.Router()
const service = require('./../../models/userModel')
const mailer = require('./../../utils/mailer')
errorHandler = (error, res) => {
    console.error(error); // logs
    return res.json({ error: "Error en la consulta" });
  };

newUser = (res,req) =>{
    const {nombre, password, permiso} = req.body
    const obj = {nombre, password, permiso}
    return service
        .postUser(obj)
        .then((value)=> res.json({new : value}))
        .catch((error)=> errorHandler(error, res))

}


router.post('/', newUser)
router.put('/:id', updateUser)
module.exports = router