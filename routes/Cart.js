const express = require('express')
const { addToCart, fetchCartByUser, updateCart, deleteCart } = require('../controller/Cart')
const router = express.Router()

router
.post('/',addToCart)
.get('/',fetchCartByUser)
.patch('/:id',updateCart)
.delete('/:id',deleteCart)

exports.router = router;