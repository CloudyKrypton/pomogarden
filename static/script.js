// Timer variables
let timer;
let isPaused = false;
let minutes = 25;
let seconds = 0;
// let minutes = 0;
// let seconds = 5;
let isBreak = false;
const timerDisplay = document.getElementById("timer-display");
const breakDisplay = document.getElementById("break-display");
let planted = [false, false, false, false, false, false, false, false];
let names = ['bonsai', 'cactus', 'dandelion', 'cactus-1', 'dandelion-1', 'bonsai-1', 'cactus-2', 'bonsai-2'];
let types = ['bonsai', 'cactus', 'dandelion', 'cactus', 'dandelion', 'bonsai', 'cactus', 'bonsai'];

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
        minutes = 5;
        encourage();
        // seconds = 3;
        isBreak = true;
        cycleNumber++;
        grow();
        timerDisplay.style.display = "none";
        breakDisplay.style.display = "flex";
        breakDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
      } else {
        minutes = 25;
        // seconds = 5;
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
const cactus = document.getElementById("cactus");
const dandelion = document.getElementById("dandelion");
const cactus1 = document.getElementById("cactus-1");
const dandelion1 = document.getElementById("dandelion-1");
const bonsai1 = document.getElementById("bonsai-1");
const cactus2 = document.getElementById("cactus-2");
const bonsai2 = document.getElementById("bonsai-2");

function plantSeed() {
    if (cycleNumber == 1) {
        planted[0] = true;
        plantedCursor('bonsai');
        bonsai.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 2) {
        planted[1] = true;
        plantedCursor('cactus');
        cactus.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 3) {
        planted[2] = true;
        plantedCursor('dandelion');
        dandelion.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 4) {
        planted[3] = true;
        plantedCursor('cactus-1');
        cactus1.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 5) {
      planted[4] = true;
      plantedCursor('dandelion-1');
      dandelion1.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 6) {
      planted[5] = true;
      plantedCursor('bonsai-1');
      bonsai1.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 7) {
      planted[6] = true;
      plantedCursor('cactus-2');
      cactus2.style.backgroundImage = 'url("static/images/seedling.png")';
    } else if (cycleNumber == 8) {
      planted[7] = true;
      plantedCursor('bonsai-2');
      bonsai2.style.backgroundImage = 'url("static/images/seedling.png")';
    }
}

function plantedCursor(plantName) {
  document.getElementById(plantName).addEventListener('mouseover', function() {
    this.style.cursor = 'pointer';
  });

  document.getElementById(plantName).addEventListener('mouseout', function() {
    this.style.cursor = 'default'; // Change it back to the default cursor on mouseout
  });
}

function grow() {
  if (cycleNumber == 2) {
    bonsai.style.backgroundImage = 'url("static/images/bonsai-sprout.png")';
  } else if (cycleNumber == 3) {
    bonsai.style.backgroundImage = 'url("static/images/bonsai-grown.png")';
    cactus.style.backgroundImage = 'url("static/images/cactus-sprout.png")';
  } else if (cycleNumber == 4) {
    cactus.style.backgroundImage = 'url("static/images/cactus-grown.png")';
    dandelion.style.backgroundImage = 'url("static/images/dandelion-sprout.png")';
  } else if (cycleNumber == 5) {
    dandelion.style.backgroundImage = 'url("static/images/dandelion-grown.png")';
    cactus1.style.backgroundImage = 'url("static/images/cactus-sprout.png")';
  } else if (cycleNumber == 6) {
    cactus1.style.backgroundImage = 'url("static/images/cactus-grown.png")';
    dandelion1.style.backgroundImage = 'url("static/images/dandelion-sprout.png")';
  } else if (cycleNumber == 7) {
    dandelion1.style.backgroundImage = 'url("static/images/dandelion-grown.png")';
    bonsai1.style.backgroundImage = 'url("static/images/bonsai-sprout.png")';
  } else if (cycleNumber == 8) {
    bonsai1.style.backgroundImage = 'url("static/images/bonsai-grown.png")';
    cactus2.style.backgroundImage = 'url("static/images/cactus-sprout.png")';
  } else if (cycleNumber == 9) {
    cactus2.style.backgroundImage = 'url("static/images/cactus-grown.png")';
    bonsai2.style.backgroundImage = 'url("static/images/bonsai-sprout.png")';
  } else if (cycleNumber == 10) {
    bonsai2.style.backgroundImage = 'url("static/images/bonsai-grown.png")';
  }
}

// Text
function getData(plantName, typeName, i) {
    if (planted[i] && !isBreak) {
      fetch('/plant_motivate/' + typeName)
        .then(response => response.json())
        .then(data => {
            var loadPlant = document.getElementById("text-" + plantName);
            loadPlant.style.display = "flex";
            document.getElementById('text-' + plantName).innerText = data.msg;
            setTimeout(function() {clearBubble(plantName); }, 6000);
        })
        .catch(error => console.error('Error:', error));
    } else if (planted[i] && isBreak) {
      fetch('/plant_fact/' + typeName)
        .then(response => response.json())
        .then(data => {
            var loadPlant = document.getElementById("text-" + plantName);
            loadPlant.style.display = "flex";
            document.getElementById('text-' + plantName).innerText = data.msg;
            setTimeout(function() {clearBubble(plantName); }, 6000);
        })
        .catch(error => console.error('Error:', error));
    }
}

function encourage() {
  for (let i = 0; i < 8; i++) {
    if (planted[i]) {
      fetch('/plant_congratulate/' + types[i])
        .then(response => response.json())
        .then(data => {
            // Update the result div with the data
            var loadPlant = document.getElementById("text-" + names[i]);
            loadPlant.style.display = "flex";
            document.getElementById('text-' + names[i]).innerText = data.msg;
            setTimeout(function() {clearBubble(names[i]); }, 9000);
        })
        .catch(error => console.error('Error:', error));
    }
  }
}

function clearBubble(plantName) {
  var clearPlant = document.getElementById("text-" + plantName);
  clearPlant.style.display = "none";
}

// Menu
function closeMenu() {
  var menu = document.getElementById('menu');
  menu.style.display = "none";
  var fade = document.getElementById('fade');
  fade.style.display = "none";
}

// Music & SFX
var musicPaused = true;
var audio = document.getElementById('background-music');
function playBackgroundMusic() {
  if (musicPaused) {
    audio.play();
    musicPaused = false;
  } else {
    audio.pause();
    musicPaused = true;
  }
}

function playClick() {
  clickReg.play();
}