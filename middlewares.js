const express = require('express')
const jwt = require('jsonwebtoken');
const fs = require('fs');
securedAdmin = (req,res,next) => {
    try {
      let token = req.headers['authorization'];
      token = token.replace('Bearer ','');
      const publicKey = fs.readFileSync('./claves/publica.pem');
      let decoded = jwt.verify(token, publicKey);
      req.id = decoded.id;
      req.permiso = decoded.permiso;
  
      req.permiso == 1 ? next() : res.status(401).json({message : 'blablalba'})
    } catch (error) {
      res.status(500).json({message: 'unauthorized'});
    }
}

secureUser = (req,res,next) => {
  try {
    let token = req.headers['authorization'];
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    let decoded = jwt.verify(token, publicKey);
    req.id = decoded.id;
    req.permiso = decoded.permiso;

    req.permiso == (0 || 1) ? next() : res.status(401).json({message : 'blablalba'})
  } catch (error) {
    res.status(500).json({message: 'unauthorized'});
  }
}
module.exports={
  securedAdmin,
  secureUser
}