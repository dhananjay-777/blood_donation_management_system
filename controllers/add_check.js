const client = require("../configs/db.js");

exports.add = (req, res) => {
  let { donorId, donorName, bloodGroup, bloodQuantity, age } = req.body;

  client.query(
    `select * from donors where donorId='${donorId}'`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error: "error",
        });
      } else if (data.rows != 0) {
        res.status(400).json({
          error: "Try different donorId",
        });
      } else {
        client.query(
          `insert into donors values ('${donorId}','${donorName}','${bloodGroup}','${bloodQuantity}','${age}')`,
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(400).json({
                error: "Donor not added",
              });
            } else {
              res.status(200).json({
                message: "success",
              });
            }
          }
        );
      }
    }
  );
};

exports.update = (req, res) => {
  let { donorId, bloodGroup, bloodQuantity } = req.body;

  client.query(
    `select * from donors where donorId='${donorId}'`,
    (err, data) => {
      // console.log(data.rows[0]);
      if (err) {
        console.log(err);
        res.status(400).json({
          error: "error",
        });
      } else if (data.rows == 0) {
        res.status(400).json({
          error: "No donor with given donor ID",
        });
      } else if (bloodGroup != data.rows[0].bloodgroup) {
        res.status(400).json({
          error: "Blood Group does not matched",
        });
      } else {
        let currentquantity = Number(data.rows[0].bloodquantity);
        currentquantity += Number(bloodQuantity);
        client.query(
          `update donors set bloodQuantity='${currentquantity}' where donorId='${donorId}'`,
          (err, dataa) => {
            if (err) {
              console.log(err);
              res.status(400).json({
                error: "Not updated",
              });
            } else {
              res.status(200).json({
                message: "Updated Successfully",
              });
            }
          }
        );
      }
    }
  );
};

exports.check = (req, res) => {
  const bloodGroup = req.params.bloodGroup;
  let data = [];

  client.query(
    `select * from donors where bloodGroup='${bloodGroup}'`,
    (err, dataa) => {
      if (err) {
        res.status(400).json({
          error: "Error",
        });
      } else {
        const donors = dataa.rows;
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

  client.query(`select * from camps where campId='${campId}'`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "error",
      });
    } else if (data.rows != 0) {
      res.status(400).json({
        error: "Try different campId",
      });
    } else {
      var values = [[`${campId}`, `${address}`, `${doctorName}`, `${date}`]];
      client.query(
        `insert into camps values('${campId}','${address}','${doctorName}','${date}')`,
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              error: "Camp not added",
            });
          } else {
            // console.log(data);
            res.status(400).json({
              message: "camp added successfully",
            });
          }
        }
      );
    }
  });
};

exports.find_camps = (req, res) => {
  let data = [];

  client.query(`select * from camps`, (err, dataa) => {
    if (err) {
      res.status(400).json({
        error: "Error",
      });
    } else {
      const camps = dataa.rows;
      camps.forEach((ele) => {
        data.push(ele);
      });
      res.status(200).json({
        data: data,
      });
    }
  });
};
