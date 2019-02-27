const fs = require('fs')
const path = require('path')

const optionStringify = require('./optionStringify')
const post = require('./post')

class ImageOptim {
  constructor (username) {
    if (!username) {
      throw new Error('username is required')
    }

    this._username = username
    this._buffer = null
    this._url = ''
  }

  async _compress (imageURL, options) {
    let optionString = ''

    if (typeof options === 'object' && !options.length) {
      optionString = await optionStringify(options)
    } else {
      throw new Error('options are invalid')
    }

    this._url = `https://im2.io/${this._username}/${optionString}/${imageURL}`

    try {
      this._buffer = await post(this._url)
    } catch (err) {
      throw err
    }

    return this
  }

  async compressAndWriteFile (filepath, imageURL, options = {}) {
    filepath = path.resolve(filepath)

    await this._compress(imageURL, options)

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

  async compressAndSaveToBuffer (imageURL, options = {}) {
    await this._compress(imageURL, options)

    if (!this._buffer) throw new Error('buffer is empty')

    return Buffer.from(this._buffer)
  }
}

module.exports = ImageOptim
