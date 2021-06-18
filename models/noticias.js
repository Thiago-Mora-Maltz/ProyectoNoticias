const pool = require('../db')


getAll = async () =>{
    return pool(process.env.T_NOTICIAS)
        .select()   
}

getNoticia = async(id) => {
    return pool(process.env.T_NOTICIAS)
        .where({id : id})
        .select()
}

postNoticia = (obj) => {
    return pool(process.env.T_NOTICIAS)
        .insert(obj)
}

updateNoticia = async (id, obj) =>{
    return pool(process.env.T_NOTICIAS)
        .where({id : id})
        .update({obj :obj})
}

deleteNoticia = async (id)=>{
    return pool(process.env.T_NOTICIAS)
        .where({id: id})
        .delete()
}

module.exports = {
    getAll,
    getNoticia,
    postNoticia,
    updateNoticia,
    deleteNoticia
}
    // getAll = async ()=>{
                                //     try {
                                    //         let query = `select * from ${process.env.T_NOTICIAS}`
                            //         const rows = await pool.query(query); 
                            //         return rows
                            //     } catch (error) {
                                //         throw error
                            //     }
                            // }
                            
                            // getNoticia = async (id)=>{
                            //     try {
                            //         let query = `select * from ${process.env.T_NOTICIAS} where id = ?`
                            //         const rows = await pool.query(query, id); 
                            //         return rows
                            //     } catch (error) {
                            //         throw error
                            //     }
                            // }
                            // postNoticia = async (obj)=>{
                                //     try {
                            //         let query = `insert into ${process.env.T_NOTICIAS} set ?`
                            //         const rows = await pool.query(query, obj); 
                            //         return rows
                            //     } catch (error) {
                            //         throw error
                            //     }
                                        // updateNoticia = async (id,obj)=>{
                                        //     try {
                                        //         let query = `update ${process.env.T_NOTICIAS} set ? where id = ?`
                                        //         const rows = await pool.query(query, [obj, id]); 
                                        //         return rows
                                        //     } catch (error) {
                                        //         throw error
                                        //     }
                                        // }
                            // }