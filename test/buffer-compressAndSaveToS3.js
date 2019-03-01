require('dotenv').config()

const fs = require('fs')
const { promisify } = require('util')

const ImageOptimUpload = require('../index.js')
const start = Date.now()
const {
  USERNAME
} = process.env

async function main () {
  const io = new ImageOptimUpload(USERNAME, require('./S3.json'))
  const cloudPath = `stage/products/compressed-class-s3.jpeg`

  console.log('converting image...')

  const readFile = promisify(fs.readFile)
  const source = await readFile('./test/uncompressed.jpeg')
  const path = await io.compressAndSaveToS3(
    source,
    {
      ACL: 'public-read',
      Bucket: 'pomona-images',
      Key: cloudPath
    },
    'uncompress.jpeg'
  )

  console.log(`converted to https://d3hrdje48va8xr.cloudfront.net/${path}`)
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
