require("dotenv").config();
const mongoose= require("mongoose");

mongoose.connect(
    process.env.DBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log("Error in DB connection");
      else console.log("DB connection success...");
    }
  );
  
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );



//   mongodb+srv://user:pswd@cluster0786.eve5j.mongodb.net/resume?retryWrites=true&w=majority