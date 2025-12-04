const express = require('express')
const { createOrder, updateOrder, deleteOrder, fetchOrdersByUser } = require('../controller/Order')
const router = express.Router()


router
.post('/',createOrder)
.get('/user/:userId',fetchOrdersByUser)
.patch('/:id',updateOrder)
.delete('/:id',deleteOrder)

exports.router = router