const express = require("express")
const stripe = require('stripe')('sk_test_51MQjISSGH3tlMGspO34UQ3XvSLeDN97Ug8GT35S4OzZlR4Kr8psAlSSuneIfjxXp6usbN9X7CJHVpFjZE3RiJI8x00rP03AtgB')
const cors = require('cors')
//Api

//-App config
const app = express();
//-Middleware
app.use(cors())
app.use(express.json());
//-Api routes
app.get("/", (req, res) => {
    res.status(200).send('hello world')
})
app.post('/api/payment/create', async (req, res) => {
    try {
        const total = req.query.total;
        console.log(`Paymeny request recieved `, req.query)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "INR",
            description: "just testing"
        });
        console.log(paymentIntent)
        //ok created
        res.status(201).send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        console.log("payment intent error", err)
    }
})
//-Listen command
const port = 5000
const server = app.listen(port, () => console.log('Port running on', port))