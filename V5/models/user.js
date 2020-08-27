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
    const cartProductIndex = this.cart.items.findIndex((cartProd) => {
      return cartProd.productId.toString() == product._id.toString() //product id is not a string
    })
    let newQuantity = 1
    //copy array and then edit the new one
    const updatedCartItems = [...this.cart.items]
    if (cartProductIndex >= 0) {
      //product exists so append quantity by 1
      newQuantity = this.cart.items[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      })
    }

    // store only the reference and the quantity not the elements so don;t have to update
    const updatedCart = {
      items: updatedCartItems,
    }
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
