const textArea = document.querySelector("#test-area");
const gabaritoArea = document.querySelector("#origin-text");
const theTimer = document.querySelector(".timer");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

function spellCheck (){    
    const typedText = textArea.value;
    const modelText = gabaritoArea.innerText;

    if (typedText === modelText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        testWrapper.style.borderColor = "#E95D0F";
    }       
}

function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function startTime(){
    const typedText = textArea.value;
    if (typedText.length === 0 && timerRunning === false){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    textArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";    
}

textArea.addEventListener("keyup", spellCheck, false);
textArea.addEventListener("keypress", startTime, false);
resetButton.addEventListener("click", reset, false);