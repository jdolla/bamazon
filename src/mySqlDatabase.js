/**********
 * MySqlDatabase
 *  - wraps mysql client in promises
 *  - https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
 *********/

var keys = require('./keys').mysql;
var mysql = require('mysql');

class MySqlDatabase {

  constructor(database) {

    this.config = {
      host: keys.host,
      port: keys.port,
      user: keys.username,
      password: keys.password,
      database: database
    };

    this.connection = mysql.createConnection(this.config);
  }

  query(sql, args){
    //runs a query and returns a promise containing the results.
    return new Promise( (resolve, reject) => {
      this.connection.query(sql, args, (err, rows, cols) => {
        if(err){
          // console.log(err);
          return reject({
            code: err.code,
            message: err.sqlMessage
          }); //we return so we can jump out of the callback
        }
        resolve({rows, cols});
      });
    });
  }

  close(){
    return new Promise( (resolve, reject) => {
      this.connection.end( err => {
        if(err){
          console.log(err);
          return reject(err);
        }
        resolve();
      });
    })
  }
}


module.exports = MySqlDatabase;
