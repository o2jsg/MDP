const mainContainer = document.getElementById("main-container")

const blockBreaker = document.getElementById("block-breaker")
const pipeHunter = document.getElementById("pipe-hunter")
const magoPlaytime = document.getElementById("mago-playtime")
const ranking = document.getElementById("ranking")

const blockBreakerContainer = document.getElementById("block-breaker-container")
const sec = document.getElementById("sec")
const ms = document.getElementById("ms")
const count = document.getElementById("count")
const blockBreakerBoxList = document.getElementById("block-breaker-box-list")

const pipeHunterContainer = document.getElementById("pipe-hunter-container")
const yoshiCount = document.getElementById("yoshi-count")

const magoPlaytimeContainer = document.getElementById("mago-playtime-container")
const magoPlaytimeBoxList = document.getElementById("mago-playtime-box-list")

const rankingContainer = document.getElementById("ranking-container")

const memory = document.getElementById("memory")

const memoryList = []

const pageList = ["main", "blockBreaker", "yoshiHunter", "magoPlaytime","ranking"]
let currentPage = ""

let isGameStart = false

let redButton = false,
    blueButton = false,
    yellowButton = false,
    greenButton = false,
    whiteButton = false

const wait = (time) => {
    return new Promise((res) => {
        setTimeout(() => {
            res("")
        }, time)
    })
}
const startingCount = async () => {
    let time = 3
    count.innerText = time
    const fontColor = ["#47AD37", "#FFD303", "#E8280E", "#039EDE"]
    for(let i = 0; i < 4; i++) {
        count.style.color = fontColor[i]
        await wait(1000)
        time -= 1
        if(time === 0) {
            count.innerText = `GO!`
        } else if(time < 0) {
            count.classList.add("hidden")
        } else {
            count.innerText = time
        }
    }
}

blockBreaker.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        blockBreakerContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[1]
})
pipeHunter.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        pipeHunterContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[2]
})
magoPlaytime.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        magoPlaytimeContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[3]
})
ranking.addEventListener("click", () => {
    mainContainer.classList.add("fade-out")
    setTimeout(() => {
        mainContainer.classList.add("hidden")
        rankingContainer.classList.remove("hidden")
    }, 501)
    currentPage = pageList[4]
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
                await wait(10)
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
    static start = () => {
        startingCount().then(() => {
            BlockBreaker.randomBox()
            BlockBreaker.countDown()
        })
    }
}

class PipeHunter {
    static yoshiCount = 25
    static color = ["red", "blue", "green", "yellow", "white"]

    static popYoshi = async () => {
        const random = Math.floor(Math.random() * 5)
        const yoshi = document.getElementById(`yoshi-${PipeHunter.color[random]}`)
        await wait(250).then(async () => {
            yoshi.style.transform = "translate(0px, -100px)"
            await wait(250).then(() => {
                yoshi.style.transform = "none"
            })
        })
    }

    static start = async () => {
        startingCount().then(async () => {
            for(let i = 0; i < PipeHunter.yoshiCount; i++) {
                const currentYoshi = PipeHunter.yoshiCount - (i+1)
                console.log(currentYoshi)
                await PipeHunter.popYoshi()
                yoshiCount.innerText = currentYoshi
            }
            isGameStart = false
        })
    }
}

window.addEventListener("keydown", (event) => {
    if(event.key === " ") {
        if(!isGameStart) {
            if(currentPage === pageList[1]) {
                isGameStart = true
                count.classList.remove("hidden")
                BlockBreaker.start()
            } else if(currentPage === pageList[2]) {
                isGameStart = true
                count.classList.remove("hidden")
                PipeHunter.start()
            }
        }
    }
})


class MagoPlaytime{
    static shell = 20
    
    static randomPosition = () => {
        magoPlaytimeBoxList.replaceChildren()
        const selectedColor = []
        for(let i = 0; i < 20; i++) {
            const random = Math.floor(Math.random()*5)
            selectedColor.push(BlockBreaker.color[random])
        }
        selectedColor.forEach((value) => { 
            const shell = document.createElement("img")
            shell.classList.add("shell")
            shell.src = `/texture/shell/${value}.png`
            magoPlaytimeBoxList.append(shell)
            
        })
        
    }
    static start = () => {
        MagoPlaytime.randomPosition()
    }
}
console.log(magoPlaytimeBoxList.getBoundingClientRect())
// MagoPlaytime.start()




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