# image-optim-upload
Unofficial package to handle the upload and compress image by using ImageOptim compression service. It takes an **uploaded** image URL, converts it, and returns to converted buffer. This package is able to write the returned buffer to file or return the buffer as it is. For further detail, visit ImageOptim [API documentation](https://imageoptim.com/api).

## Installation

```
npm install --save image-optim-upload
```

## Usage

```
const ImageOptimUpload = require('image-optim-upload')
const io = new ImageOptimUpload([USERNAME])

// all functions return promise
// handle using async-await
const filePath = await io.compressAndWriteFile(
  [FILENAME],
  [IMAGE], 
  [OPTIONs OBJECT]
)

const convertedBuffer = await io.compressAndSaveToBuffer(
  [IMAGE],
  [OPTIONs OBJECT]
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

### `compressAndWriteFile(fileDestination, imageSource, [options, filename])`

#### Returns
Promise, if resolved will return filepath of written file, otherwise error will be thrown.

#### Parameters
- **fileDestination** - _String_ - determine filename and directory of the written file
- **imageSource** - _String_/_Buffer_ - either URL, file path, or buffer of an image. Wrong file format is not handle yet
- **options** - _Object_ - see the details below
- **filename** - _String_ - required if _imageSource_ is buffer

### `compressAndSaveToBuffer(imageSource, [options, filename])`

#### Returns
Promise, if resolved will return buffer of compressed image, otherwise error will be thrown.

#### Parameters
- **imageSource** - _String_/_Buffer_ - either URL, file path, or buffer of an image. Wrong file format is not handle yet
- **options** - _Object_ - see the details below
- **filename** - _String_ - required if _imageSource_ is buffer

### **coming soon** `compressAndSaveToS3(imageSource, [options, filename])`

## _options_  parameter details

Please take a look at ImageOptim [API documentation](https://imageoptim.com/api) in prior. The _options_ parameter is the equivalent object schema of the options in the API. Parameter will be validated, here is the Joi validation schema that describes allowed properties and value of inside the object.

```
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