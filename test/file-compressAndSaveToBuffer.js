require('dotenv').config()

const ImageOptimUpload = require('../index.js')
const start = Date.now()
const {
  USERNAME
} = process.env

async function main () {
  const io = new ImageOptimUpload(USERNAME)

  console.log('converting image...')

  const buffer = await io.compressAndSaveToBuffer('./test/uncompressed.jpeg')

  console.log('converted to', Buffer.from(buffer).length, 'bytes')
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
