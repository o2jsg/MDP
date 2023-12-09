const SerialPort = require('serialport');
const express = require('express')// express import
const path = require('node:path') // 경로 관련 nodejs 내장 모듈 import
const app = express();
const port = 3000; 
// const comPort = new SerialPort('COM3', { baudRate: 9600, autoOpen: true, parity: "none" }, function (err) {
//     if(err) {
//         console.log(err);
//     }else{
//         console.log(SerialPort);
//     } //
// });
app.use(express.urlencoded({ extended: false }), express.json()) 
app.get('/', (_req, res) => { 
    res.send('Hello World!'); 
    // res.sendFile(path.join(__dirname, "../../front/public/html/main.html")) // "/"로 접속하면 main.html
})

app.use(express.static(`${__dirname}/../../front/public`)) 
app.listen(port, () => {
    console.log(`Sever started. port ${port}.`);
})



