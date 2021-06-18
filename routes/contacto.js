const express = require('express')
const router = express.Router()
const mailer = require('./../utils/mailer')
enviar = async (req, res)=>{
    try {
        const mail = process.env.MAIL
        console.log(mail)
        const html = `
        <html>
            <body>
                <h3>${req.body.mensaje}</h3>
            </body>
        </html>`
        console.log(html)
        const subject = req.body.mail
        console.log(subject)
        const respuesta = await mailer.sendRegisterInfo(mail, html, subject)
        console.log(respuesta)
        res.json({})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}


router.post('/', enviar)
module.exports = router