var express = require("express");
var router = express.Router();
var secureController = require("../controllers/secureng");


router.get('/', (req, res) => {
    res.send('api router working')
})

router.post("/signup", secureController.registerUser);
router.post("/login", secureController.loginUser);
router.get("/checkUserId/:uid", secureController.checkUserName);
router.get("/profile", secureController.profile);
router.post("/update", secureController.updateProfile);





// ------------------------------------resume---------------------------------------------------------

router.post("/newResume", secureController.newResume);
router.get("/getResume", secureController.ResumeData);




router.get("/logout", (req, res) => {
    console.log("cookies deleted");
    res.clearCookie("auth");
    console.log(req["cookies"]);
    res.status(200).json({
        logout: true,
    });
});

router.get("/isAuth", (req, res) => {
    jwt.verify(req.token, "mysecretKey", (err, authData) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.json({
                message: "Secure access",
                data: authData,
            });
        }
    });
});
router.get("/setCookie/:key", (req, res) => {
    res.cookie("value", req.params.key);
    res.send(req.cookies);
});

router.get("/getCookie", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
});



module.exports = router;