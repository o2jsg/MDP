const { SerialPort } = require('serialport');
const express = require('express');// express import
const path = require('node:path');// 경로 관련 nodejs 내장 모듈 import
const app = express();
const port = 80; // 바꾸지 마시오
let button;
// const serialPort = new SerialPort({ path: 'COM3', baudRate: 9600});
// serialport.update({ baudRate:9600 },  (err) => {});
SerialPort.list().then(ports => {
    ports.forEach(function (port) {
        console.log(port.path)
    })
})
app.use(express.urlencoded({ extended: false }), express.json())
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/main.html")) // "/"로 접속하면 main.html
})

app.post("/tsjsm", (req, res) => {
    const data = req.body
    console.log(data)
    res.json({ data: "a" })
})

app.use(express.static(`${__dirname}/../../front/public`))
app.listen(port, () => {
    console.log(`Sever started. port ${port}.`);
})

// serialPort.on(1, (data) => {
//     button = 1;
//     console.log('받은 데이터:', data);
    
// });

// serialPort.on(2, (data) => {
//     button = 2;
//     console.log('받은 데이터:', data);
// });
// serialPort.on(3, (data) => {
//     button = 3;
//     console.log('받은 데이터:', data);
// });
// serialPort.on(4, (data) => {
//     button = 4;
//     console.log('받은 데이터:', data);
// });
// serialPort.on(5, (data) => {
//     button = 5;
//     console.log('받은 데이터:', data);
// });





