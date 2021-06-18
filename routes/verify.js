var express = require('express');
var router = express.Router();
const service = require('./../models/userModel')

confirmar = async (req,res)=>{
    try {
        const result = await service.getUserByJWT(req.params.id)
        if(result.length > 0){
            const obj = await service.updateUser({id: result[0].id}, {habilitado: 1})
            res.json({status: true, usuario: result})
        }else{
            console.log('Error de verificacion')
            res.send()
        }
    } catch (error) {
        console.log(error)
    }
}
router.get('/:id', confirmar)
module.exports= router