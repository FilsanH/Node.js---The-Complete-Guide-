///const products = []  store data in file instead

const fs = require('fs')
const path = require('path')

module.exports = class Product {
  constructor(t) {
    this.title = t
  }
  save() {
    // find data path
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )
    // read and data to file
    fs.readFile(p, (err, fileContent) => {
      let products = []
      if (!err) {
        // file exists
        products = JSON.parse(fileContent)
      }
      products.push(this) //this refers to the class Product
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }
  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )
    //read products from jason file and return it
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([])
      }
      cb(JSON.parse(fileContent))
    })
  }
}
//static called on class and not the instances of the opject
