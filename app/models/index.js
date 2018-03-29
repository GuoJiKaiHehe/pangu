
// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

const util = require('util');
const mysql      = require('mysql');
const connection =  mysql.createConnection(app.config.mysql);
const rds = require('ali-rds');

const db = rds(app.config.mysql);



app.mysql =db;