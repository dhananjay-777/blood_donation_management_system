const client = require("../configs/db.js");

exports.add = (req, res) => {
  let { donorId, donorName, bloodGroup, bloodQuantity, age } = req.body;

  client.query(`select * from donors where donorId=${donorId}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        key: "",
        error: "error",
      });
    } else if (data.length != 0) {
      res.status(400).json({
        key: "",
        error: "Try different donorId",
      });
    } else {
      var values = [
        [
          `${donorId}`,
          `${donorName}`,
          `${bloodGroup}`,
          `${bloodQuantity}`,
          `${age}`,
        ],
      ];
      client.query(`insert into donors values ?`, [values], (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            key: "",
            error: "Donor not added",
          });
        } else {
          // console.log(data);
          res.status(200).json({
            key: "success",
          });
        }
      });
    }
  });
};

exports.update = (req, res) => {
  let { donorId, bloodGroup, bloodQuantity } = req.body;

  client.query(`select * from donors where donorId=${donorId}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        key: "",
        error: "error",
      });
    } else if (data.length == 0) {
      res.status(400).json({
        key: "",
        error: "No donor with given donor ID",
      });
    } else if (bloodGroup != data[0].bloodGroup) {
      res.status(400).json({
        key: "",
        error: "Blood Group does not matched",
      });
    } else {
      let currentQuantity = Number(data[0].bloodQuantity);
      currentQuantity += Number(bloodQuantity);
      client.query(
        `update donors set bloodQuantity=${currentQuantity} where donorId=${donorId}`,
        (err, dataa) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              key: "",
              error: "Not updated",
            });
          } else {
            res.status(200).json({
              key: "success",
              error: "Updated Successfully",
            });
          }
        }
      );
    }
  });
};

exports.check = (req, res) => {
  let { bloodGroup } = req.body;

  let data = [];

  client.query(
    `select * from donors where bloodGroup='${bloodGroup}'`,
    (err, donors) => {
      if (err) {
        res.status(400).json({
          error: "Error",
        });
      } else {
        donors.forEach((ele) => {
          data.push(ele);
        });
        res.status(200).json({
          data: data,
        });
      }
    }
  );
};

exports.add_camp = (req, res) => {
  let { campId, doctorName, address, date } = req.body;

  client.query(`select * from camps where campId=${campId}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        key: "",
        error: "error",
      });
    } else if (data.length != 0) {
      res.status(400).json({
        key: "",
        error: "Try different campId",
      });
    } else {
      var values = [[`${campId}`, `${address}`, `${doctorName}`, `${date}`]];
      client.query(`insert into camps values ?`, [values], (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            key: "",
            error: "Camp not added",
          });
        } else {
          // console.log(data);
          res.status(400).json({
            key: "success",
          });
        }
      });
    }
  });
};

exports.find_camps = (req, res) => {
  // let { bloodGroup } = req.body;

  let data = [];

  client.query(`select * from camps`, (err, camps) => {
    if (err) {
      res.status(400).json({
        error: "Error",
      });
    } else {
      camps.forEach((ele) => {
        data.push(ele);
      });
      res.status(200).json({
        data: data,
      });
    }
  });
};
