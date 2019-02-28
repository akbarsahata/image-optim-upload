const superagent = require('superagent')

module.exports = (url, source) => {
  console.log(url, source)
  return new Promise((resolve, reject) => {
    if (source) {
      superagent.post(url)
        .attach('file', source.file, source.name)
        .then(res => {
          return resolve(res.body)
        })
        .catch(err => {
          console.log(err.headers.warning)
          return reject(err)
        })
    } else {
      superagent.post((url))
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          return resolve(res.body)
        })
    }
  })
}
