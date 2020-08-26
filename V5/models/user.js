const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
//store refernce to object class
const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email) {
    this.name = username
    this.email = email
  }
  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }
  static findById(userId) {
    const db = getDb()
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) }) // find returns a cursor findOne doesnt return a cursor but the item but only use if know only one exists
      .then((user) => {
        console.log(user)
        return user
      })
  }
}
module.exports = User
