var express = require("express");
var router = express.Router();
var secureController = require("../controllers/secureng");

router.get('/secure', (req, res) => {
    res.json({
        secure: true,
        message: 'data con  success'
    })
})
router.get('/', (req, res) => {
    res.send('api router working')
})

router.post("/signup", secureController.registerUser);
router.post("/login", secureController.loginUser);
router.get("/checkUserId/:uid", secureController.checkUserName);
router.get("/profile", secureController.profile);
router.post("/update", secureController.updateProfile);






router.get("/cvinfo", secureController.getCVdet);
router.post("/cvSingle", secureController.getOneCV);
router.post("/updateResume", secureController.updateResume);
router.post("/newResume", secureController.newResume);
router.post("/deleteResume", secureController.deleteResume);



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





// router.get("/parsePdf", (req, res) => {
//     console.log("Parsing pdf start");
//   });
  
//   router.get("/sendMail", async (req, res) => {
//     const { recipient, message } = req.body;
//     try {
//       console.log("Start sending mail");
//       let ans = await sendEmail("recipient", "message");
//       console.log(ans);
//       res.json({ message: "Your query has been sent" });
//     } catch (e) {
//       console.log("Error sending mail");
//       console.log(e);
//     }
//   });




module.exports = router;