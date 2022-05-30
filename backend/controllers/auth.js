const client = require("../configs/db.js");

exports.signUp = (req, res) => {
  const { license_no, doctor_name, doc_password, hospital } = req.body;

  client.query(
    `select * from doctors where license_no='${license_no}';`,
    (err, data) => {
      let isValid = data;
      // console.log(license_no, doctor_name, User_name, doc_password, hospital);
      if (isValid.length != 0) {
        res.status(400).json({
          key: "",
          error: "License number already registered",
        });
      } else {
        var values = [
          [`${doctor_name}`, `${doc_password}`, `${hospital}`, `${license_no}`],
        ];
        client.query(`insert into doctors values ?`, [values], (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              key: "",
              error: "Error while inserting",
            });
          } else {
            // console.log(data);
            res.status(200).json({
              key: "success",
            });
          }
        });
      }
    }
  );
};

exports.signIn = (req, res) => {
  const { license_no, doc_password } = req.body;
  client.query(
    `select * from doctors where license_no = '${license_no}';`,
    (err, data) => {
      let isValid = data;
      //  console.log(doc_password);
      if (isValid.length == 0) {
        res.status(400).json({
          key: "",
          error: "Wrong Credentials",
        });
      } else {
        if (isValid[0].doc_password == doc_password) {
          res.status(200).json({
            key: "success",
            message: "access granted",
          });
        } else {
          res.status(400).json({
            key: "",
            message: "Wrong Credentials",
          });
        }
      }
    }
  );
};
