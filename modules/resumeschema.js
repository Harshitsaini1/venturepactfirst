var mongoose = require("mongoose");

var resumeSchema = mongoose.Schema(
  {
    email:{type:String, required: true},
    userdata: {
      fname: { type: String },   
      lname: { type: String },  
      Address: { type: String },
      email: { type: String },
      Profession:{type:String},
      Phone:{type:String},
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
        Detail: [{ type: String }],
      },
    ],
   
    skills: [
      {
        skills: { type: String },
      },
    ],
    //end of schema
  },
  { collection: "resume" }
);

module.exports = mongoose.model("resume", resumeSchema);
