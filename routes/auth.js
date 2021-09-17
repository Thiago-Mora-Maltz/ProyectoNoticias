const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const sha1 = require('sha1')

const jwt = require('jsonwebtoken')
const fs = require('fs') // libreria propia del core de node

// JWT -> PAYLOAD, CLAVE, SIGNOPTIONS

router.post('/', async (req, res) => {
  try {
    let { mail, password } = req.body
    let result = await userModel.getUser(mail, sha1(password))
    if (result.length > 0) {
      const privateKey = fs.readFileSync('./claves/privada.pem', 'utf-8')

      let signOptions = {
        expiresIn: '2h',
        algorithm: 'RS256',
      }

      payload = {
        id: result[0].id,
        permiso: result[0].permiso,
        usuario: result[0].usuario,
      }

      const token = jwt.sign(payload, privateKey, signOptions)

      res.json({
        JWT: token,
        permiso: payload.permiso,
        usuario: payload.usuario,
      })
    } else {
      res.json(false)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false })
  }
})

module.exports = router
