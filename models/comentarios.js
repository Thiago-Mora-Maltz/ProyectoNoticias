const pool = require('../db')

getComentarios = (id) => {
    return pool(process.env.T_COMENTARIOS)
    .where(id)    
    .select("*")
}

postComentario= (obj) => {
    return pool(process.env.T_COMENTARIOS)
        .insert(obj)
}

deleteComentario = (id) => {
    return pool(process.env.T_COMENTARIOS)
            .where({id: id})
            .delete()
}

module.exports = {
    getComentarios,
    postComentario,
    deleteComentario
    //    updateComentario,
}
// updateComentario = (id, obj) =>{
    //     return pool(process.env.T_COMENTARIOS)
                    //         .where({id_noticia : id})
                    //         .update(obj)
                    // }