const nodemailer = require('nodemailer');

const transport = {
    service : 'gmail',
    auth : {
        user : process.env.USER_CORREO,
        pass : process.env.PASSWORD_CORREO
    },
    tls : {
        rejectUnauthorized : false
    }
}
const transporter = nodemailer.createTransport(transport);


mailGeneric = async (mail,msg,subject) => {
    try {
        const body = {to : mail, subject : subject, html : msg}
        const info = await transporter.sendMail(body);
        return info;
    } catch(error) {
        throw error;
    }
}
sendRegisterInfo = async(mail,msg, subject) => {
    try {
        let msgId = await mailGeneric(mail,msg,subject);
        return msgId;
    } catch(error) {
        throw error;
    }
}
module.exports = {
    sendRegisterInfo
}