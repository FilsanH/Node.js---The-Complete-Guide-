const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id ? id : null // if set update product if not create a new one in save()
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOp
    if (this._id) {
      //Update the product
      //not id is not over written
      dbOp = db
        .collection('products')
        .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this }) //specfiy changes you want to make to db
    } else {
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) }) // mongodb compares id to id objectId type
      .next()
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = getDb()
    db.collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then((result) => {
        console.log('Deleted')

        return result
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = Product
