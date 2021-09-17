const fs = require('fs') // file system
const uuid = require('node-uuid')

const saveImage = (file) => {
  const extensionsAllow = ['jpeg', 'png']
  let fileNameResult = '' // uuid.extension
  const { mimetype, filename } = file
  const extension = mimetype.split('/')[1]
  if (extensionsAllow.includes(extension)) {
    const uid = uuid()
    fileNameResult = `${uid}.${extension}`
    const fileNameTmp = `./public/tmp/${filename}`
    //const fileNameOut = `./public/images/${fileNameResult}`
    const fileNameOut = `../../../noticiasfront/proyecto/src/assets/images/${fileNameResult}`
    fs.createReadStream(fileNameTmp).pipe(fs.createWriteStream(fileNameOut))
    fs.unlink(fileNameTmp, (error) => console.error(error))
  }
  return fileNameResult // asd1822e-ansd8123qew-asd9ja0n1.png
}

module.exports = {
  saveImage,
}
