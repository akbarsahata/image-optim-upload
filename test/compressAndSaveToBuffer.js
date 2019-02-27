const ImageOptim = require('../lib')
const start = Date.now()

async function main () {
  const io = new ImageOptim('cdzgzlvkrk')

  console.log('converting image...')

  const buffer = await io.compressAndSaveToBuffer(
    'https://d3hrdje48va8xr.cloudfront.net/stage/products/1551161989445_mqyxg4IpWLguvGw2.jpeg'
  )

  console.log('converted to', Buffer.from(buffer).length, 'bytes')
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
