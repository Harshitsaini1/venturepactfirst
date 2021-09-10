const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const apiRoute = require('./routes/secure')
var cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000;
require("./modules/connect");

const ngUser = require("./modules/register");
const ngCV = require("./modules/resumeschema")




const { error } = require("console");
const { ConnectionStates } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Headers",

        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authentication"
    );
    next();
});


app.use('/api', apiRoute);









// app.get("/", (req, res) => {
//     res.render("index");
// })

// app.get("/login", (req, res) => {
//     res.render("login");
// })

// app.get("/register", (req, res) => {
//     res.render("register");
// })

// app.post("/register", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;
//         if (password === cpassword) {
//             const registeremployee = new register({
//                 FirstName: req.body.FirstName,
//                 lastName: req.body.lastName,
//                 gender: req.body.gender,
//                 email: req.body.email,
//                 Country: req.body.Country,
//                 password: password,
//                 confirmpassword: cpassword,
//             })
//             console.log("the success part" + registeremployee);
//             const token = await registeremployee.generateAuthToken();
//             console.log("the token part"+ token);


//             const registered = await registeremployee.save();
//             res.status(201).render("login");
//         }
//         else {
//             res.send("password are not matching");
//         }
//     }
//     catch (error) {
//         res.status(400).send(error);
//         console.log("the error part page");
//     }
// })

// app.post("/login", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const useremail = await register.findOne({ email: email });

//         const isMatch = await bcrypt.compare(password, useremail.password);

//         if (isMatch) {
//             res.status(201).render("index");
//         } else {
//             res.send("password not matching");
//         }

//     }
//     catch {
//         res.status(400).send("invalid login details")
//     }
// })





// app.get("/register", (req, res) => {
//     res.send("register");
// })


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});




