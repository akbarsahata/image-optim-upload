# image-optim
Unofficial package to handle the upload and compress image by using ImageOptim compression service. It takes an **uploaded** image URL, converts it, and returns to converted buffer. This package is able to write the returned buffer to file or return the buffer as it is. For further detail, visit ImageOptim [API documentation](https://imageoptim.com/api).

## Instalation

```
npm install image-optim
```

## Usage

```
const ImageOptim = require('image-optim')
const io = new ImageOptiom([USERNAME])

// using async-await
const filePath = await io.convertToFile(
  [FILENAME],
  [IMAGE URL],
  [OPTION OBJECT]
)

const convertedBuffer = await io.converToBuffer(
  [IMAGE URL],
  [OPTION OBJECT]
)
```

For more details on option, please check ImageOptiom [API documentation](https://imageoptim.com/api).
## 