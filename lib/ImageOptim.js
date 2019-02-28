const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { URL } = require('url')

const optionStringify = require('./optionStringify')
const post = require('./post')

const isURL = str => {
  try {
    const url = new URL(str)
    return url
  } catch (error) {
    return false
  }
}

class ImageOptim {
  constructor (username) {
    if (!username) {
      throw new Error('username is required')
    }

    this._username = username
    this._buffer = null
    this._url = ''
  }

  async _compress (source, options, filename) {
    let optionString = 'full'

    if (typeof options === 'object' && !options.length) {
      optionString = await optionStringify(options)
    } else {
      throw new Error('options are invalid')
    }

    try {
      if (isURL(source)) {
        this._url = `https://im2.io/${this._username}/${optionString}/${source}`

        source = null
      } else if (Buffer.isBuffer(source)) {
        if (!filename) {
          throw new Error('filename is required if passing buffer')
        }

        this._url = `https://im2.io/${this._username}/${optionString}`

        source = {
          file: source,
          name: filename
        }
      } else {
        this._url = `https://im2.io/${this._username}/${optionString}`

        const readFile = promisify(fs.readFile)

        source = {
          file: await readFile(path.resolve(source)),
          name: source.split('/').pop()
        }
      }

      this._buffer = await post(this._url, source)
    } catch (err) {
      throw err
    }

    return this
  }

  async compressAndWriteFile (filepath, image, options = {}, filename = '') {
    filepath = path.resolve(filepath)

    await this._compress(image, options, filename)

    return new Promise((resolve, reject) => {
      fs.writeFile(
        filepath,
        this._buffer,
        err => {
          if (err) return reject(err)

          resolve(filepath)
        }
      )
    })
  }

  async compressAndSaveToBuffer (image, options = {}, filename = '') {
    await this._compress(image, options, filename)

    if (!this._buffer) throw new Error('buffer is empty')

    return Buffer.from(this._buffer)
  }

  async compressAndSaveToS3 (image, options = {}) {

  }
}

module.exports = ImageOptim
