require("dotenv").config({
  path: "../secrets/.env"
});

exports.mysql = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_SERVER,
  port: process.env.MYSQL_PORT
};