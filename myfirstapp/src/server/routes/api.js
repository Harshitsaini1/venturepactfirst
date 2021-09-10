const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require('../models/user')

mongoose.connect("mongodb://localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log(`connection successful`);
})
    .catch((err) => {
        console.log(`no connection`);
    })



router.get('/', (req, res) => {
    res.send("api side");
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new user(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        }
        else {

            res.status(200).send(registeredUser);
        }
    })
})

router.post('/login', (req, res) => {
    let userData = rew.body;
    let user = new user(userData);
    user.findone({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            if (!user) {
                res.status(401).send("INVALID MAIL");
            } else 
                if (user.password !== userData.password) {
                    res.status(401).send("INVALID MAIL");
                }else
            {
                res.status(201).send(user);
            }
        }
    })
})
module.exports = router;