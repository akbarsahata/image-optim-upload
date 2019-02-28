require('dotenv').config()

const ImageOptimUpload = require('../index.js')
const start = Date.now()
const {
  USERNAME,
  SOURCE_URL
} = process.env

async function main () {
  const io = new ImageOptimUpload(USERNAME)

  console.log('converting image...')

  const path = await io.compressAndWriteFile(
    'compress-class-1.jpeg',
    SOURCE_URL
  )

  console.log('converted to', path)
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
