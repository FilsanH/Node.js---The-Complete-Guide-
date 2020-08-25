const { get } = require('../routes/shop')

const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }
  save() {
    const db = getDb
    //db.collection('products').insertOne({ name: 'Abook ', price: 123}) // returns a promise access using then
    db.collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
