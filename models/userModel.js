const pool = require('../db')

async function getUser(mail, pass){
    return pool(process.env.T_USUARIOS)
        .where({password: pass, mail : mail, habilitado: 1})
        .select()
}

async function getUserByEmail(mail){
    return pool(process.env.T_USUARIOS)
        .where({mail : mail})
        .select()
}

async function getUserByJWT(jwt) {
    return pool(process.env.T_USUARIOS)
        .where({JWT: jwt})
        .select()
}


async function postUser(obj){
        return pool(process.env.T_USUARIOS)
            .insert(obj)
}

async function updateUser(id, obj){
        return pool(process.env.T_USUARIOS)
        .where(id)
        .update(obj)
    // return pool(process.env.T_USUARIOS)
    //     .where(id)
    //     .select()
}
module.exports ={
    getUser,
    postUser,
    updateUser,
    getUserByEmail,
    getUserByJWT
}