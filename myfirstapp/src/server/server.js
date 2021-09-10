const express = require("express");
const bodyparser = require("body-parser");

const port = 3000;
const api = require('./routes/api')

const app = express();

app.use(bodyparser.json());

app.use('/api', api);

app.get('/', (req,res)=>{
    res.send("server side");
})

app.listen(port, ()=>{
    console.log("listening");
})