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

// let logFile = '';

dirPath = '/logs/' + year + "-" + month;
fileName = '/' + year + "-" + month + "-" + day + ".log";
logTime = hour + ":" + minute + ":" + second;

const isLogExist = !fs.existsSync(path.join(__dirname, '/logs/main.log'))
logFile = fs.createWriteStream(__dirname +  dirPath + fileName, {flags : isLogExist ?? true ? 'a' : 'w'});
// fs.stat(path.join(__dirname, dirPath), (err, stats) => {
//     if (err) {
//         fs.mkdir(path.join(__dirname, dirPath), (err) => {
//             console.error(err)
//         });
//         logFile = fs.createWriteStream(__dirname +  dirPath + fileName, {flags : isLogExist ?? true ? 'a' : 'w'});
        
//         // if (!fs.existsSync(path.join(__dirname, dirPath + fileName))) {
//         //     logFile = fs.createWriteStream(__dirname +  dirPath + fileName, {flags : 'w'});
//         // }else{
//         //     logFile = fs.createWriteStream(__dirname +  dirPath + fileName, {flags : 'a'});
//         // }
//     }
//     console.log = function(d) {
//         // logFile.write(util.format(logTime) + '\n');
//         logFile.write(util.format(d) + '\n');
//         logStdout.write(util.format(d) + '\n');
//     };
// })


console.log = function(d) {
    // logFile.write(util.format(logTime) + '\n');
    logFile.write(util.format(d) + '\n');
    logStdout.write(util.format(d) + '\n');
};