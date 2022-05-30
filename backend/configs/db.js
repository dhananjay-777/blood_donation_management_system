const mysql = require("mysql2");

const client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "dbms",
});

module.exports = client;

// client.query(`Select * from doctors ;`, (err, data) => {
//   data.forEach((doc) => {
//     console.log(doc);
//   });
// });
