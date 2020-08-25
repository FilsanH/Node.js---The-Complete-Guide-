const mongod = require('mongodb')
const MongoClient = mongod.MongoClient

let _db; 

// callback happens after the database is connected to
const monogoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://dev:filsanhassan@cluster1.iojny.mongodb.net/shop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log('connected')
      _db = client.db() // connect to shop data base and store connection 
      callback(client)
    })
    .catch((err) => {
      console.log(err)
      throw err 
    })
  // connection to mongo had been coneedted and takes in a url
  //connect method throws an error
}

// have split the two so that the monogconnect can keep running 
const getDB = ()=> {
 if (_db) {
  return _db;   // returns instance of connection 
 }
 throw 'No database found '
}
module.exports = monogoConnect
