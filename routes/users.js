const express = require('express')
const router = express.Router()
const service = require('./../models/userModel')
const sha1 = require('sha1')
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken'); // libreria instalada
const fs = require('fs'); // libreria propia del core de node
const mailer = require('./../utils/mailer')
getUser = async(req,res)=>{
  service.getUser(req.body.mail, req.body.password)
  .then((response)=> res.json({user : response}))
  .catch((error)=> res.json({error: error}))
}

registrar = async (req,res)=>{
  try {
    const obj = {
      id_usuario: uuid(),
      usuario: req.body.usuario,
      password: sha1(req.body.password),
      mail: req.body.mail,
  }
    const result = await service.getUserByEmail(obj.mail)
      if(result[0]){
        res.json({mensaje: 'Ya hay un usuario registrado con ese mail.'})
      }else{
        const privateKey = fs.readFileSync('./claves/privada.pem','utf-8');
        let signOptions = {
        expiresIn : '8h',
        algorithm : "RS256"
        }
      payload = {usuario : obj.usuario, contraseña : obj.password}
      const token = jwt.sign(payload,privateKey,signOptions);
      obj.JWT = token 
      const html = `
      <html>
        <body>
          <h1>Gracias por registrarte!</h1>
          <h3>Para confirmar tu cuenta, por favor haga click en el siguiente enlace >>http://http://localhost:4200/verify/${token}<<</h3>
        </body>
      </html>`
      const subject = 'Confirmacion de cuenta'
      await service.postUser(obj)
      const user = await mailer.sendRegisterInfo(obj.mail, html, subject)
      console.log(user)
      res.json({status: true, usuario: obj})
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

router.post('/', registrar)
router.get('/', getUser)
module.exports = router;