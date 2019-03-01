require('dotenv').config()

const fs = require('fs')
const { promisify } = require('util')

const ImageOptimUpload = require('../index.js')
const start = Date.now()
const {
  USERNAME
} = process.env

async function main () {
  const io = new ImageOptimUpload(USERNAME)

  console.log('converting image...')

  const readFile = promisify(fs.readFile)
  const source = await readFile('./test/uncompressed.jpeg')
  const buffer = await io.compressAndSaveToBuffer(source, 'uncompressed.jpeg')

  console.log('converted to', Buffer.from(buffer).length, 'bytes')
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
