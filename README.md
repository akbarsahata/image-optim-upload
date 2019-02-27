# image-optim-upload
Unofficial package to handle the upload and compress image by using ImageOptim compression service. It takes an **uploaded** image URL, converts it, and returns to converted buffer. This package is able to write the returned buffer to file or return the buffer as it is. For further detail, visit ImageOptim [API documentation](https://imageoptim.com/api).

## Instalation

```
npm install --save image-optim-upload
```

## Usage

```
const ImageOptim = require('image-optim-upload')
const io = new ImageOptim([USERNAME])

// using async-await
const filePath = await io.compressAndWriteFile(
  [FILENAME],
  [IMAGE URL],
  [OPTION OBJECT]
)

const convertedBuffer = await io.compressAndSaveToBuffer(
  [IMAGE URL],
  [OPTION OBJECT]
)
```

For more details on option, please check ImageOptiom [API documentation](https://imageoptim.com/api).

## Results

> image source: pexels

### Before
https://d3hrdje48va8xr.cloudfront.net/stage/products/1551161989445_mqyxg4IpWLguvGw2.jpeg (~5.5MB)
![](https://d3hrdje48va8xr.cloudfront.net/stage/products/1551161989445_mqyxg4IpWLguvGw2.jpeg)

### After
./compress-class-1.jpeg (~2.8MB)
![](compress-class-1.jpeg)