const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/database');
const registerRoute = require('./routes/auth/auth.api');

// middleware
app.use(cors());
app.use(express.json());
app.use(`/api`,registerRoute);
connectDB();


app.get('/',(req,res)=>{
    res.send(`<div>
        <h1>Welcome Hero-rider API</h1>
    </div>`)
})

app.listen(port, () => {
    console.log(`hero -rider APIs Run on ${port}`)
})