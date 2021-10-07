var mongoose = require("mongoose");

var resumeSchema = mongoose.Schema(
  {
    email : String,
    userdata: {
      fname: { type: String },   
      lname: { type: String },  
      Profession:{type:String},
      email: { type: String },    
      Phone:{type:String},
      Address: { type: String },
    },
    education: [
      {
        School: { type: String },  
        Degree: { type: String },
        CGPA: { type: Number },
      },
    ],
    experience: [
      {
       
        Cname: { type: String },
        Role: { type: String },
        Description: [{ type: String }],
      },
    ],
    project: [
      {
        pname: { type: String },
        Description: [{ type: String }],
      },
    ],
   
    skill: [
      {
        Skills: { type: String },
      },
    ],
    //end of schema
  },
  { collection: "resume" }
);

module.exports = mongoose.model("resume", resumeSchema);
