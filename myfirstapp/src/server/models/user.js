const mongoose = require("mongoose");
const Schema= mongoose.Schema
const userSchema = new Schema({
    
        FirstName:
        {
            type: String,
            required: true,
        },
        LastName:
        {
            type: String,
            required: true,
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
        },
       
        password:
        {
            type: String,
            required: true,
        },
        confirmpassword:
        {
            type: String,
            required: true,
        },

        
        // tokens:[{
        //     token:{
        //         type:String,
        //         required:true,
        //     }
        // }]
})

const register = new mongoose.model("user", userSchema);
module.exports= register;