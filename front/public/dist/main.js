const mainContainer = document.getElementById("main-container")

const blockBreaker = document.getElementById("block-breaker")
const monsterHunter = document.getElementById("monster-hunter")

const blockBreakerContainer = document.getElementById("block-breaker-container")
const sec = document.getElementById("sec")
const ms = document.getElementById("ms")
const count = document.getElementById("count")
const blockBreakerBoxList = document.getElementById("block-breaker-box-list")

const monsterHunterContainer = document.getElementById("monster-hunter-container")

const pageList = ["main", "blockBreaker", "monsterHunter", "memoryGame"]
let currentPage = ""

let isGameStart = false

let redButton = false,
    blueButton = false,
    yellowButton = false,
    greenButton = false,
    whiteButton = false

blockBreaker.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        blockBreakerContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[1]
})
monsterHunter.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        monsterHunterContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[2]
})

class BlockBreaker {
    static secLimit = 60
    static msLimit = 100
    static color = ["red", "blue", "green", "yellow", "white"]

    static countDown = async () => {
        let secTime = BlockBreaker.secLimit
        let msTime = BlockBreaker.msLimit
        for(let i = 0; i < BlockBreaker.secLimit; i++) {
            for(let n = 0; n < BlockBreaker.msLimit; n++) {
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
        blockBreakerBoxList.replaceChildren()
        const selectedColor = []
        for(let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random() * 5)
            selectedColor.push(BlockBreaker.color[random])
        }
        selectedColor.forEach((value) => {
            const box = document.createElement("img")
            box.classList.add("box")
            box.src = `/texture/box/${value}.png`
            blockBreakerBoxList.append(box)
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
                        BlockBreaker.randomBox()
                        BlockBreaker.countDown()
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
                BlockBreaker.start()
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