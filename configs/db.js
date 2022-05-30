const { Client } = require("pg");

const client = new Client(process.env.db_url);

module.exports = client;
