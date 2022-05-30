const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signUp = (req, res) => {
  // const { name, email, password } = req.body;
  const { license_no, doctor_name, doc_password, hospital } = req.body;
  // console.log(license_no, doctor_name, doc_password, hospital);
  client
    .query(`select * from doctors where license_no='${license_no}';`)
    .then((data) => {
      //console.log(data);
      const isValid = data.rows;
      // console.log(isValid);
      if (isValid != 0) {
        // console.log(data);
        res.status(400).json({
          error: "Doctor already exits, You have to Sign in",
        });
      } else {
        bcrypt.hash(doc_password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error",
            });
          } else {
            const token = jwt.sign(
              {
                license_no,
              },
              process.env.SECRET_KEY
            );
            client
              .query(
                `insert into doctors values('${license_no}','${doctor_name}','${hash}','${hospital}');`
              )
              .then(() => {
                res.status(200).json({
                  message: "Doctor added to db successfully",
                  token,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.signIn = (req, res) => {
  //const { email, password } = req.body;
  const { license_no, doc_password } = req.body;
  client
    .query(`select * from doctors where license_no='${license_no}';`)
    .then((data) => {
      const isValid = data.rows;
      if (isValid == 0) {
        // console.log(data);
        res.status(400).json({
          error: "Doctor does not exits, You have to Sign up",
        });
      } else {
        //console.log(data.rows[0].password);
        const hashPassword = data.rows[0].doc_password;
        bcrypt.compare(doc_password, hashPassword, function (err, result) {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error",
            });
          } else if (result) {
            const token = jwt.sign(
              {
                license_no,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "Sign in successful",
              token,
            });
          } else {
            res.status(400).json({
              error: "Wrong Credentials",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
