const mongoose= require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>
{
    console.log(`connection successful`);
})
.catch((err)=>
{
    console.log(`no connection`);
})