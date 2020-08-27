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

  // return cart items roperty of product
  getCart() {
    const db = getDb()
    //find all product with specific id and therfore user
    //return a list of product ids that exist in product cart
    const productIds = this.cart.items.map((i) => {
      return i.productId
    })
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            //reuturn object with same old product properties with updated quantity
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString()
            }).quantity,
          }
        })
      })
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString()
    })
    //update database
    const db = getDb()
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      )
  }
  addOrder() {
    // add order to user or could do the other way around
    const db = getDb()
    return db
      .collection('orders')
      .insertOne(this.cart)
      .then((result) => {
        this.cart = { items: [] } // empty the cart in the user object and then from the database
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          )
      })
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
