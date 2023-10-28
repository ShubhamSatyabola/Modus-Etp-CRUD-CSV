const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')

const userRoutes = require("./routes/userRoutes"); ;
const app = express();

app.use(cors())
app.use(bodyParser.json({ extended: false }));

app.use(userRoutes)

app.listen(5000, ()=>{
    console.log('listening')
})