const path = require('path')
const express = require('express')
const rootDir = require('../util/path')
const router = express.Router()

const productsController = require('../controllers/products')



//remember actually /admin/add-product
router.get('/add-product', productsController.getAddProduct)

router.post('/add-product', productsController.postAddProduct)

module.exports = router
