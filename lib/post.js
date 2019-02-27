const superagent = require('superagent')

module.exports = imageOptimURL => {
  return new Promise((resolve, reject) => {
    superagent.post(imageOptimURL)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }

        return resolve(res.body)
      })
  })
}
