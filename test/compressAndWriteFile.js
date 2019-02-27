const ImageOptim = require('../lib')
const start = Date.now()

async function main () {
  const io = new ImageOptim('cdzgzlvkrk')

  console.log('converting image...')

  const path = await io.compressAndWriteFile(
    'compress-class-1.jpeg',
    'https://d3hrdje48va8xr.cloudfront.net/stage/products/1551161989445_mqyxg4IpWLguvGw2.jpeg'
  )

  console.log('converted to', path)
  console.log(`time taken ${Date.now() - start} ms`)
}

main()
