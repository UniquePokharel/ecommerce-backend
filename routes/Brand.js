const { fetchBrands, createBrand } = require('../controller/Brand')
const express = require('express')
const router = express.Router()

router
.get('/',fetchBrands)
.post('/',createBrand)


exports.router = router