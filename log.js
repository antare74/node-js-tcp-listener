const fs = require('fs');
const util = require('util');
const path = require('path');
const logStdout = process.stdout;

let dateObj = new Date();
let second = dateObj.getSeconds();
let minute = dateObj.getMinutes();
let hour = dateObj.getHours();
let month = dateObj.getUTCMonth();
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

dirPath = '/logs/';
fileName = '/' + year + "-" + month + "-" + day + ".log";
logTime = hour + ":" + minute + ":" + second;
const isLogExist = !fs.existsSync(path.join(__dirname, '/logs/main.log'))
logFile = fs.createWriteStream(__dirname +  dirPath + fileName, {flags : isLogExist ?? true ? 'a' : 'w'});

console.log = function(d) {
    logFile.write(util.format(d) + '\n');
    logStdout.write(util.format(d) + '\n');
};