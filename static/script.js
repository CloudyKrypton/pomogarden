// Timer variables
let timer;
let isPaused = false;
// let minutes = 25;
// let seconds = 0;
let minutes = 0;
let seconds = 5;
let isBreak = false;
const timerDisplay = document.getElementById("timer-display");
const breakDisplay = document.getElementById("break-display");

// Audio variables
var notif = new Audio('static/sfx/notification.mp3');
var clickSound = new Audio('static/sfx/click-sound.mp3');
var clickReg = new Audio('static/sfx/click-regular.mp3');

// Cycle variables
var cycleNumber = 1;

// Timer

function startTimer() {
    clickSound.play();
    if (!timer) {
        if (!isBreak) {
            plantSeed();
        }
        timer = setInterval(updateTimer, 1000);
    } else {
        isPaused = false;
    }
}

function pauseTimer() {
    clickSound.play();
    isPaused = true;
}

function updateTimer() {
  if (!isPaused) {
    if (minutes === 0 && seconds === 0) {
      notif.play();
      clearInterval(timer);
      timer = null;
      alert("Timer completed!");
      toggleButtons();
      if (!isBreak) {
        // minutes = 5;
        seconds = 3;
        isBreak = true;
        cycleNumber++;
        grow();
        timerDisplay.style.display = "none";
        breakDisplay.style.display = "flex";
        breakDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
      } else {
        // minutes = 25;
        seconds = 5;
        isBreak = false;
        timerDisplay.style.display = "flex";
        breakDisplay.style.display = "none";
        timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
      }
    } else {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      const display = document.getElementById("timer-display");
      if (!isBreak) {
        display.textContent = `${pad(minutes)}:${pad(seconds)}`;
      } else {
        breakDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
      }
    }
  }
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

// Button disappearing

function toggleButtons() {
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
  
    if (startBtn.style.display !== "none") {
        startBtn.style.display = "none";
        pauseBtn.style.display = "flex";
    } else {
        startBtn.style.display = "flex";
        pauseBtn.style.display = "none";
    }
}

const bonsai = document.getElementById("bonsai");

function plantSeed() {
    if (cycleNumber == 1) {
        bonsai.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 2) {
        tomato.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 3) {
        dandelion.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 4) {
        cactus.style.backgroundImage = 'url("static/images/seedling.png")';
    }
}

function grow() {
    if (cycleNumber == 2) {
        bonsai.style.backgroundImage = 'url("static/images/bonsai-sprout.png")';
    } else if (cycleNumber == 3) {
        bonsai.style.backgroundImage = 'url("static/images/bonsai-grown.png")';
    }
}

// Text
function getData(plantName) {
    // Make an AJAX request to the Flask server
    fetch('/plant_motivate/' + plantName)
        .then(response => response.json())
        .then(data => {
            // Update the result div with the data
            var loadPlant = document.getElementById("text-" + plantName);
            loadPlant.style.display = "flex";
            document.getElementById('text-' + plantName).innerText = data.msg;
            setTimeout(function() {clearBubble(plantName); }, 6000);
        })
        .catch(error => console.error('Error:', error));
}

function clearBubble(plantName) {
  var clearPlant = document.getElementById("text-" + plantName);
  clearPlant.style.display = "none";
}

// Menu
function closeMenu() {
  var menu = document.getElementById('menu');
  menu.style.display = "none";
}

// Music & SFX
function playBackgroundMusic() {
  var audio = document.getElementById('background-music');
  audio.play();
}

function playClick() {
  clickReg.play();
}