var express = require('express');
var router = express.Router();
const service = require('./../models/userModel')
const mailer = require('./../utils/mailer')
const jwt = require('jsonwebtoken'); // libreria instalada
const fs = require('fs');
const sha1 = require('sha1')
recuperarPass = async (req, res) =>{
    try {
        const usuario = await service.getUserByEmail(req.body.mail)
        console.log(usuario)
        const privateKey = fs.readFileSync('./claves/privada.pem','utf-8');
        let signOptions = {
        expiresIn : '2h',
        algorithm : "RS256"
        }
        payload = {usuario : usuario.usuario, id: usuario.id}
        const token = jwt.sign(payload,privateKey,signOptions);
        const html = `
        <html>
            <body>
                <h1>Recuperacion de contraseña</h1>
                <h3>Para cambiar tu contraseña, sigue el siguiente enlace >>http://http://localhost:4200/actualizarPass/${token}<<</h3>
            </body>
        </html>`
        const subject = 'Restaurar contraseña'
        console.log(usuario[0].id)
        console.log(token)
        const update = await service.updateUser({id: usuario[0].id}, {JWT: token})
        console.log(update)
        const result = await mailer.sendRegisterInfo(req.body.mail, html, subject)
        res.json(result)    
    } catch (error) {
        console.log(error)
        res.sendStatus(500)        
    }    
}

nuevaContraseña = async (req,res) => {
    try {
        const result = await service.getUserByJWT(req.params.id)
        console.log(result)
        if(result.length > 0){
            res.json({status: true})
        }else{
            console.log(result)
            res.json({})
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
} 

actualizarContraseña = async (req,res) => {
    try {
        const usuario = await service.getUserByJWT(req.params.id)
        const obj = {password : sha1(req.body.password)}
        const result = await service.updateUser({id: usuario[0].id}, obj)
        res.json({status: true})
    } catch (error) {
        res.sendStatus(500)
    }
}
router.post('/', recuperarPass)
router.get('/:id', nuevaContraseña)
router.post('/:id', actualizarContraseña)
module.exports= router