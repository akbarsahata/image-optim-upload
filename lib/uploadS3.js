const AWS = require('aws-sdk')

function uploadS3 (buffer, uploadParam, s3config) {
  AWS.config.update({
    ...s3config
  })

  const s3 = new AWS.S3()

  Reflect.deleteProperty(uploadParam, 'Body')

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...uploadParam,
        Body: buffer
      },
      err => {
        if (err) {
          return reject(err)
        }

        return resolve(uploadParam.Key)
      }
    )
  })
}

module.exports = uploadS3

// {
//   ACL: 'public-read',
//   Bucket: 'pomona-images',
//   Key: cloudPath,
//   Body: buffer,
//   ContentType: 'image/jpeg'
// },
