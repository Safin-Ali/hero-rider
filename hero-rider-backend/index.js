const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/database');
const registerRoute = require('./routes/auth/auth.api');
const leassonPackgesRoute = require('./routes/leasson-packages/leasson.packages.api');
const paymentRoute = require('./routes/payment/payment.api');
const adminRoute = require('./routes/admin/admin.api');

// middleware
app.use(cors());
app.use(express.json());
app.use(`/api`,registerRoute);
app.use(`/api`,leassonPackgesRoute);
app.use(`/api`,paymentRoute);
app.use(`/api/admin`,adminRoute);

// connect data base
connectDB();

app.get('/',(req,res)=>{
    res.send(`<div>
        <h1>Welcome Hero-rider API</h1>
    </div>`)
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`hero - rider APIs Run on ${port}`)
})