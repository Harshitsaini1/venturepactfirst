let ngUser = require("../modules/register");
let ngCV = require("../modules/resumeschema");
let bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.registerUser = function (req, res) {
  console.log("Registering User");
  console.log(req.body);

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      console.log("password hashed");
      if (err) {
        console.log(err);
        res.status(400).end();
      } else {
        console.log("Running hash OK");

        let ngData = new ngUser({
          firstname: req.body.firstname,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
          password: hash,
        });
        ngData
          .save()
          .then((resData) => {
            console.log(resData);
            res.status(202).json({
              saved: true,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).end();
          });
      }
    });
  });
};

exports.loginUser = function (req, res) {
  console.log("logging in  User");
  console.log(req.body); //username and password
  console.log("Cookies: ");
  console.log(req.cookies);
  // console.log(req["cookies"]["auth"]);

  ngUser
    .findOne({ email: req.body.email })
    .lean()
    .then((data) => {
      console.log(data);
      if (data == null) {
        return res.status(404).json({
          status: false,
          info: "User NOT found ! ERROR",
        });
      }
      // match the provided user password and provide the auth tocken
      bcrypt.compare(req.body.password, data.password, (err, ans) => {
        if (ans === true) {
          console.log("User password matched successs");
          //now we will sign the jwt tocken with the userName
          jwt.sign(
            { userId: req.body.email },
            "mysecretKey",
            (err, token) => {
              res.cookie("auth", token, {
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: false,
              });

              res.status(200).json({
                jwt: token,
                info: "Jwt signed and sent to client",
                status: true,
              });
            }
          );
        }
        //password not match
        else {
          return res.status(401).json({
            status: false,
            info: "Authentication failed !",
          });
        }
        if (err) {
          return res.status(404).json({
            status: false,
            info: "Error in verifying Password !",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        status: false,
        info: "User found ERROR",
      });
    });
};

exports.checkUserName = function (req, res) {
  let userId = req.params.uid;
  console.log(userId);
  ngUser
    .findOne({ email: userId })
    .lean()
    .then((data) => {
      console.log(data);
      if (data == null) {
        return res.status(200).json({
          userFound: false,
          availableUser: true,
          status: false,
          info: "User NOT FOUND ",
        });
      }
      //if user is available we cant use the email
      res.status(200).json({
        userFound: true,
        availableUser: false,
      });
    })
    .catch((Err) => {
      console.log(Err);
      res.status(404).json({
        status: false,
        info: "User FOUND ERROR",
      });
    });
};

exports.profile = function (req, res) {
  console.log("profile request");
  console.log(req.cookies);
  if (req["cookies"]["auth"] === undefined) {
    return res.status(401).json({
      redirect: true,
      location: "login",
      message: "Auth token not found",
    });
  }

  jwt.verify(req["cookies"]["auth"], "mysecretKey", (err, authData) => {
    console.log("Inside jwt");
    console.log(authData.userId);
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      console.log("block running");
      ngUser
        .findOne({ email: authData.userId })
        .lean()
        .then((data) => {
          console.log("profiledata");
          console.log(data);
          if (data == null) {
            return res.status(404).json({
              userFound: false,
              status: false,
              info: "User NOT FOUND ",
            });
          }
          //if email is available we cant use email
          res.status(200).json({
            firstname: data.firstname,
            userName: data.userName,
            email: data.email,
            
          });
        })
        .catch((Err) => {
          console.log(Err);
          res.status(404).json({
            status: false,
            info: "User FOUND ERROR",
          });
        });
    }
  });
};

exports.updateProfile = function (req, res) {

  console.log(req.body);
  if (req["cookies"]["auth"] === undefined) {
    return res.status(404).json({
      status: false,
      message: "Auth token not available",
    });
  }

  jwt.verify(req["cookies"]["auth"], "mysecretKey", (err, authData) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        status: false,
        message: "Auth token not available",
      });
    } else {
      console.log(authData);
      console.log(String(authData.userId));
      //hashing the password
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          console.log("password hashed");
          if (err) {
            console.log(err);
            res.status(400).end();
          } else {
            console.log("Running hash OK");
            ngUser
              .updateOne(
                { email: authData.userId },
                {
                  firstname: req.body.firstname,
                  userName: req.body.userName,
                  email: req.body.email,
                 
                },
                { new: true }
              )
              .then((dta) => {
                console.log(dta);
                
                jwt.sign(
                  { userId: req.body.email },
                  "mysecretKey",
                  (err, token) => {
                    res.cookie("auth", token, {
                      maxAge: 24 * 60 * 60 * 1000,
                      secure: true,
                      httpOnly: false,
                    });

                    res.status(200).json({
                      jwt: token,
                      info: "Jwt signed and sent to client",
                      status: true,
                    });
                  }
                );
              })
              .catch((error) => {
                res.status(404).json({
                  status: false,
                  message: "Error updating user",
                  err: error,
                });
              });
          }
        });
      });
    }
  });
};






// resume --------------------------------------------------------------------------------------------

exports.ResumeData= async function(req,res){
  console.log(req.cookies);
  if (req["cookies"]["auth"] === undefined) {
    return res.status(401).json({
      redirect: true,
      location: "login",
      message: "Auth token not found",
    });
  }

  jwt.verify(req["cookies"]["auth"], "mysecretKey", (err, authData) => {
    console.log("Inside jwt");
    console.log(authData.userId);
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      console.log("block running");
      ngCV
        .findOne({ email: authData.userId })
        .lean()
        .then((data) => {
          console.log("resumedata");
          console.log(data);
          if (data == null) {
            return res.status(404).json({
              userFound: false,
              status: false,
              info: "resume NOT FOUND ",
            });
          }
          //if email is available we cant use email
          res.status(200).send({
           data
            
          });
        })
        .catch((Err) => {
          console.log(Err);
          res.status(404).json({
            status: false,
            info: "User FOUND ERROR",
          });
        });
    }
  });
  
  // res.send({message: "Success"});
}







exports.getCVdet = async function (req, res) {
  if (req.headers["authorization"] === undefined) {
    return res.status(404).json({
      status: false,
      message: "Auth token not available",
    });
  }
  console.log("request to get all user cv details");
  try {
    var decoded = jwt.verify(
      req.headers["authorization"].slice(1, -1),
      "mysecretKey"
    );
    console.log(decoded);
    let curUid = decoded.userId;
    let allResume = await ngCV.find({ email: curUid }).lean();
    console.log(allResume);
    res.status(201).json(allResume);
  } catch (err) {
    return res.status(404).json({
      status: false,
      message: "Error in Jwt tocken",
    });
  }
};


exports.getOneCV = async function (req, res) {
  if (req.headers["authorization"] === undefined) {
    return res.status(404).json({
      status: false,
      message: "Auth token not available",
    });
  }
  console.log("request to get cv details");
  let allResume = await ngCV.findById(req.body._id).lean();
  console.log(allResume);
  res.json(allResume);
};

exports.updateResume = async function (req, res) {
  console.log("Update request resume");
  console.log(req.body);
  if (req.headers["authorization"] === undefined) {
    return res.status(404).json({
      status: false,
      message: "Auth token not available",
    });
  }
  try {
    var decoded = jwt.verify(
      req.headers["authorization"].slice(1, -1),
      "mysecretKey"
    );
    console.log(decoded);
    req.body.data["email"] = decoded.userId;
    console.log("Data going to be saved");
    console.log(req.body.data);
    //update the resume by its id
    let updtRes = await ngCV.updateOne({ _id: req.body.curId }, req.body.data);
    console.log("resume Update run succ");
    console.log(updtRes);
    res.status(201).json(updtRes);
  } catch (err) {
    return res.status(404).json({
      status: false,
      message: "Error in Jwt token",
    });
  }
};
exports.newResume = function (req, res) {
  console.log("New resume insert request");
  console.log(req.body);
  
  if (req.headers["authorization"] === undefined) {
    return res.status(404).json({
      status: false,
      
      message: "Auth token not available",
    });
  }
  try {
    var decoded = jwt.verify(
      req.headers["authorization"].slice(1, -1),
      "mysecretKey"
    );
    console.log(decoded);
    req.body.data["email"] = decoded.userId;
    console.log(req.body.data);
    let nayaRes = new ngCV(req.body.data);

    nayaRes
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).json(data);
        console.log("data is saved");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    return res.status(404).json({
      status: false,
      message: "Error in Jwt token",
    });
  }
};

exports.deleteResume = async function (req, res) {
  console.log("Delete request for CV recieved");
  console.log(req.body);
  let delResp = await ngCV.deleteOne({ _id: req.body._id });
  console.log(delResp);
  res.status(200).json({ success: delResp });
};

//testing file upload
exports.fileUpload = function (req, res) {
  console.log("File up test");
  console.log(req.body);
  res.status(202).json({ success: true });
};

