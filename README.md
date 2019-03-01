# image-optim-upload
Unofficial package to handled the upload and compress image by using ImageOptim compression service. It takes an **uploaded** image URL, converts it, and returns to converted buffer. This package is able to write the returned buffer to file or return the buffer as it is. For further detail, visit ImageOptim [API documentation](https://imageoptim.com/api).

## Installation

```
npm install --save image-optim-upload
```

## Usage

```javascript
const ImageOptimUpload = require('image-optim-upload')
const iou = new ImageOptimUpload([USERNAME])

// all functions return promise
// handled using async-await
const filePath = await iou.compressAndWriteFile(
  [FILENAME],
  [IMAGE], 
  [OPTION OBJECT],
  [FILENAME]
)

const convertedBuffer = await iou.compressAndSaveToBuffer(
  [IMAGE],
  [OPTION OBJECT],
  [FILENAME]
)

// set the S3 config beforehand
iou.s3([S3 CONFIG OBJECT])
const s3path = await iou.compressAndSaveToS3(
  [IMAGE],
  [OPTION OBJECT],
  [S3 PARAM],
  [FILENAME]
)
```

For more details on options, please check ImageOptiom [API documentation](https://imageoptim.com/api).

## API

### Instantiation `ImageOptimUpload`

To instantiate the module, use `new` and it will result and object. The only parameter it needs is _username_ and it's required, otherwise instantiation will throw error.

```
const ImageOptimUpload = require('image-optim-upload')
const iou = new ImageOptimUpload('username')
```

### `compressAndWriteFile(fileDestination, imageSource, [options], filename)`
Will upload to ImageOptim and write the compressed image to file

#### Returns
Promise, if resolved will return filepath of written file, otherwise error will be returned.

#### Parameters
- **fileDestination** - _String_ - determine filename and directory of the written file
- **imageSource** - _String_/_Buffer_ - either URL, file path, or buffer of an image. Wrong file format is not handled yet
- **options** - _Object_ - see the details below
- **filename** - _String_ - required only if _imageSource_ is buffer

### `compressAndSaveToBuffer(imageSource, [options], filename)`
Will upload to ImageOptim and return the buffer of the compressed image.

#### Returns
Promise, if resolved will return buffer of compressed image, otherwise error will be returned.

#### Parameters
- **imageSource** - _String_/_Buffer_ - either URL, file path, or buffer of an image. Wrong file format is not handled yet
- **options** - _Object_ - (optional) see the details below
- **filename** - _String_ - required only if _imageSource_ is buffer

### `compressAndSaveToS3(imageSource, [options], s3param, filename)`
Will upload to ImageOptim, upload the compressed image to S3, and return the S3 path. To use this feature, make sure to pass S3 config when instantiating the ImageOptim class or set it before calling the function.

```javascript
const ImageOptimUpload = require('image-optim-upload')
const iou = new ImageOptimUpload([USERNAME], [S3 CONFIG OBJECT])

// or you can use the setter
iou.s3([S3 CONFIG OBJECT])
```

#### Returns
Promise, if resolved will return path file on designated bucket, otherwise error will be returned.

#### Parameters
- **imageSource** - _String_/_Buffer_ - either URL, file path, or buffer of an image. Wrong file format is not handled yet
- **options** - _Object_ - (optional) see the details below
- **s3param** - _Object_ - params of S3's upload function on [aws-sdk](https://npmjs.com/package/aws-sdk). Check its [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property).
- **filename** - _String_ - required only if _imageSource_ is buffer

## About _options_  parameter

By default, _quality_ is set to medium and _timeout_ is set to 30. Please take a look at ImageOptim [API documentation](https://imageoptim.com/api) in prior. The _options_ parameter is the equivalent object schema of the options in the API. Parameter will be validated, here is the Joi validation schema that describes allowed properties and value of inside the object.

```javascript
const IMAGE_OPTIM_QUALITY = ['low', 'medium', 'high', 'lossless']
const IMAGE_OPTIM_MULTIPLY = ['1x', '2x', '3x']
const IMAGE_OPTIM_CROP = [true, 'auto', 'top', 'left', 'right', 'bottom']
const IMAGE_OPTIM_FORMAT = ['png', 'jpeg', 'webm', 'h264']

const optionSchema = Joi.object().keys(
  {
    quality: Joi.string().valid(IMAGE_OPTIM_QUALITY),
    multiply: Joi.string().valid(IMAGE_OPTIM_MULTIPLY),
    maxWidth: Joi.number().positive(),
    maxHeight: Joi.number().positive(),
    fit: Joi.boolean().default(false),
    scaleDown: Joi.boolean().default(false),
    crop: Joi.any().valid(IMAGE_OPTIM_CROP),
    cropX: Joi.number(),
    cropY: Joi.number(),
    trim: Joi.string().valid('border'),
    format: Joi.string().valid(IMAGE_OPTIM_FORMAT),
    timeout: Joi.number().positive()
  }
)
```

## Results

> image source: [pexels](https://pexels.com)

### Before
(~5.5MB)
![](https://d3hrdje48va8xr.cloudfront.net/stage/products/1551161989445_mqyxg4IpWLguvGw2.jpeg)

### After
(~2.8MB)
![](compress-class-1.jpeg)

## License
ISC