const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  console.log('In the middleware')
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  })
  // call next to entre next middleware
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save() //save instance of product as property of class
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    })
  })
}
