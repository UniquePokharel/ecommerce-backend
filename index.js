require('dotenv').config()
const express = require('express')
const server = express()
const mongoose = require('mongoose')
const productRouter = require('./routes/Product')
const categoryRouter = require('./routes/Category')
const brandRouter = require('./routes/Brand')
const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Order')
const path = require('path')
const cors = require('cors')


const endpointSecret =process.env.ENDPOINT_SECRET
server.post('/webhook',express.raw({type:'application/json'}),(request,response)=>{
  const sig = request.headers['stripe-signature'];
  let event;
  try{
    event = stripe.webhooks.constructEvent(req.body,sig,endpointSecret)
  }catch(err){
    response.status(400).send(`Webhook error: ${err.message}`)
    return;
  }
  switch(event.type){
  case 'payment_intent.succeeded':
    const paymentIntentSucceeded = event.data.object;
    console.log(paymentIntentSucceeded)
    break;
    default:
      console.log(`Unhandled event type ${event.type}`)
}
response.send()

})

// jwt options
// server.use(express.raw({type:'application/json'}))
server.use(express.static(path.resolve(__dirname,'dist')))
server.use(express.json())
server.use(express.static("public"));
server.use(cors({
  exposedHeaders: ['X-Total-Count']
}))

server.use('/products',productRouter.router)
server.use('/categories',categoryRouter.router)
server.use('/brands',brandRouter.router)
server.use('/users',userRouter.router)
server.use('/auth',authRouter.router)
server.use('/cart',cartRouter.router)
server.use('/orders',orderRouter.router)


// payments 
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);






server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// webhook


// handle the event 






// mongoose connect
main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('database started')
}



server.listen(process.env.PORT,()=>{
    console.log('server started')
})