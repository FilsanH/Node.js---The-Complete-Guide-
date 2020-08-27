const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
//store refernce to object class
const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email, cart, id) {
    this.name = username
    this.email = email
    this.cart = cart // {items: []}
    this._id = id
  }
  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    //check if cart already contains product
    // const cartProduct = this.cart.items.findIndexcart(cartProd=>{
    //   return cartProd === product._id
    // })

    // store only the reference and the quantity not the elements so don;t have to update 
    const updatedCart = { items: [{...product, quantity: 1 }] }
    const db = getDb()
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
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
