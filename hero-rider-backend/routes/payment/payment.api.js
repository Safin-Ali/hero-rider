const express = require('express');
const route = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { verifyJWT} = require('../../helpers/auth.helper');


route.post("/payment-intent", verifyJWT, async (req, res) => {
    const { packagesId, amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
});

module.exports = route;