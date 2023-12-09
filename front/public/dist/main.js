const mainContainer = document.getElementById("main-container")
const totoGameContainer = document.getElementById("totoGame-container")
const sec = document.getElementById("sec")
const ms = document.getElementById("ms")
const totoGame = document.getElementById("totoGame")
const count = document.getElementById("count")
const totoGameBoxList = document.getElementById("totoGame-box-list")

const pageList = ["main", "totoGame", "quicknessGame", "memoryGame"]
let currentPage = ""

let isGameStart = false

let redButton = false,
    blueButton = false,
    yellowButton = false,
    greenButton = false,
    whiteButton = false

totoGame.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        totoGameContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[1]
})

class TotoGame {
    static secLimit = 60
    static msLimit = 100
    static color = ["red", "blue", "green", "yellow", "white"]

    static countDown = async () => {
        let secTime = TotoGame.secLimit
        let msTime = TotoGame.msLimit
        for(let i = 0; i < TotoGame.secLimit; i++) {
            for(let n = 0; n < TotoGame.msLimit; n++) {
                await new Promise((res) => {
                    setTimeout(() => {
                        msTime -= 1
                        if(msTime === 100 || msTime === 0) {
                            ms.innerText = "00"
                        } else {
                            if(msTime < 10) {
                                ms.innerText = `0${msTime}`
                            } else {
                                ms.innerText = msTime
                            }
                        }
                        res("")
                    }, 10)
                })
            }
            msTime = 100
            secTime -= 1
            if(secTime <= 30 && secTime > 10) {
                sec.style.color = "#FFD203"
                ms.style.color = "#FFD203"
            } else if(secTime <= 10) {
                sec.style.color = "#E8280E"
                ms.style.color = "#E8280E"
            }
            if(secTime < 10) {
                sec.innerText = `0${secTime}`
            } else {
                sec.innerText = secTime
            }
            
        }
        count.innerText = `Time Is Up!`
        isGameStart = false
        count.classList.remove("hidden")
    }
    static randomBox = () => {
        totoGameBoxList.replaceChildren()
        const selectedColor = []
        for(let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random() * 5)
            selectedColor.push(TotoGame.color[random])
        }
        selectedColor.forEach((value) => {
            const box = document.createElement("img")
            box.classList.add("box")
            box.src = `/texture/box/${value}.png`
            totoGameBoxList.append(box)
        })
    }
    static start = async () => {
        let time = 3
        const fontColor = ["#47AD37", "#FFD303", "#E8280E", "#039EDE"]
        for(let i = 0; i < 4; i++) {
            count.style.color = fontColor[i]
            await new Promise((res) => {
                setTimeout(() => {
                    time -= 1
                    if(time === 0) {
                        count.innerText = `GO!`
                        TotoGame.randomBox()
                        TotoGame.countDown()
                    } else if(time < 0) {
                        count.classList.add("hidden")
                    } else {
                        count.innerText = time
                    }
                    res("")
                }, 1000)
            })
        }
    }
}

window.addEventListener("keydown", (event) => {
    if(event.key === " ") {
        if(!isGameStart) {
            if(currentPage === pageList[1]) {
                isGameStart = true
                count.classList.remove("hidden")
                TotoGame.start()
            }
        }
    }
})
// fetch('/tsjsm',{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
// }).then(res => res.json()).then((res) => {
//      const data = res.data
// })
// if(data == 1){
    redButton = true;
// }else if(data == 2){
    blueButton = true;
//}else if(data == 3){
    yellowButton = true;
//}else if(data == 4){
    greenButton = true;
//}else if(data == 5){
    whiteButton = true;
//}else console.log("Err");