const Joi = require('joi')
const {
  IMAGE_OPTIM_CROP,
  IMAGE_OPTIM_FORMAT,
  IMAGE_OPTIM_MULTIPLY,
  IMAGE_OPTIM_QUALITY
} = require('./constants')

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

async function parameterize (options) {
  let inputParams = {}

  try {
    inputParams = await Joi.validate(
      options,
      optionSchema,
      {
        stripUnknown: true
      }
    )
  } catch (err) {
    throw err
  }

  const params = {
    quality: 'medium',
    timeout: 30
  }

  Object.assign(params, inputParams)

  if (params.maxWidth) {
    params.size = {}
    params.size.width = params.maxWidth
    if (params.maxHeight) {
      params.size.height = params.maxHeight
    }

    Reflect.deleteProperty(params, 'maxHeight')
    Reflect.deleteProperty(params, 'maxWidth')
  }

  if (params.cropX && params.cropY) {
    params.crop = {
      x: params.cropX,
      y: params.cropY
    }
  }

  return params
}

async function optionStringify (options) {
  const params = await parameterize(options)
  const paramsArr = []

  Object.keys(params).forEach(key => {
    if (params[key] === true) {
      paramsArr.push(key)
    } else if (typeof params[key] === 'object') {
      paramsArr.push(
        Object.values(params[key]).join('x')
      )
    } else if (params[key] !== false) {
      paramsArr.push(`${key}=${params[key]}`)
    }
  })

  return paramsArr.join()
}

module.exports = optionStringify

// const ImageOptim = require('./lib')

// const io = new ImageOptim('cdzgzlvkrk')

// {
//   multiply: '1x',
//   maxWidth: 300,
//   maxHeight: 400,
//   fit: true,
//   scaleDown: true,
//   crop: true,
//   trim: 'border',
//   format: 'jpeg',
//   timeout: 100
// }
