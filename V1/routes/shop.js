const path = require('path')
const express = require('express')

const rootDir = require('../util/path')
const productsController = require('../controllers/products')

const router = express.Router()

router.get('/', productsController.getProducts) //notice get therefore ojnrder or calling routes doesnt matter but if use use it will mater

module.exports = router
