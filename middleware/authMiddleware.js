const jwt = require("jsonwebtoken");
const client = require("../configs/db");
exports.verifyToken = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers.authorization;
  //console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(500).json({
        status: "server error occured",
      });
    } else {
      const license_no = decoded.license_no;
      // console.log(email);
      //next();
      client
        .query(`select * from doctors where license_no='${license_no}';`)
        .then((data) => {
          const isValid = data.rows;
          if (isValid == 0) {
            // console.log(data);
            res.status(400).json({
              error: "Doctors does not exits, You have to Sign up",
            });
          } else {
            req.license_no = license_no;
            // console.log(req.email);
            next();
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "Internal Server Error",
          });
        });
    }
  });
};
