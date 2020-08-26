const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://dev:filsanhassan@cluster1.iojny.mongodb.net/shop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log('Connected!')
      callback(client)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = mongoConnect
