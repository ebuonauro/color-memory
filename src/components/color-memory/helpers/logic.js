const gameContainer = document.querySelector('.color-memory');
const gameStates    = ['intro', 'phase1', 'phase2', 'phase3', 'results'];
const beginButton = document.querySelector('.color-memory__intro--cta');
const colorChoicesElem = document.querySelector('.color-memory__phase3--choices');
let correctColor = null;
beginButton.addEventListener('click', startGame);

function startGame() {
  resetGameState();
  gameContainer.classList.add(gameStates[1]);
  selectDifficulty();
}

function selectDifficulty() {
  const easyButton = document.querySelector('.color-memory__phase1--easy');
  const normalButton = document.querySelector('.color-memory__phase1--normal');
  const hardButton = document.querySelector('.color-memory__phase1--hard');
  easyButton.addEventListener('click', selectEasyGame);
  normalButton.addEventListener('click', selectNormalGame);
  hardButton.addEventListener('click', selectHardGame);
}

function selectEasyGame() {
  resetGameState();
  gameContainer.classList.add(gameStates[2]);
  createRandomColor('easy');
}

function selectNormalGame() {
  resetGameState();
  gameContainer.classList.add(gameStates[2]);
  createRandomColor('normal');
}

function selectHardGame() {
  resetGameState();
  gameContainer.classList.add(gameStates[2]);
  createRandomColor('hard');
}

function createRandomColor(difficulty) {
  let rgbChars = [];
  for (i = 0; i < 3; i++) {
    rgbChars.push(Math.floor(Math.random() * 256));
  }
  let newColor = 'rgb(' + rgbChars[0] + ',' + rgbChars[1] + ',' + rgbChars[2] + ')';
  
  document.querySelector('.color-memory__phase2--swatch').style.background = newColor;
  setProgressBar('.color-memory__phase2--countdown', '5s', newColor);

  for (i = 0; i < 5; i++) {

    if (difficulty == 'easy') {
      let variance = 80;
      let relativeColor = createMoreRelativeColors(rgbChars, variance);
      colorChoicesElem.innerHTML += '<input type="radio" id="color-' + i + '" name="color-choice" class="color-choice" data-color="' + relativeColor+ '"><label for="color-' + i + '" style="background-color: ' + relativeColor + ';"></label>';
    } else if (difficulty == 'normal') {
      let variance = 40;
      let relativeColor = createMoreRelativeColors(rgbChars, variance);
      colorChoicesElem.innerHTML += '<input type="radio" id="color-' + i + '" name="color-choice" class="color-choice" data-color="' + relativeColor+ '"><label for="color-' + i + '" style="background-color: ' + relativeColor + ';"></label>';
    } else if (difficulty == 'hard') {
      let variance = 20;
      let relativeColor = createMoreRelativeColors(rgbChars, variance);
      colorChoicesElem.innerHTML += '<input type="radio" id="color-' + i + '" name="color-choice" class="color-choice" data-color="' + relativeColor+ '"><label for="color-' + i + '" style="background-color: ' + relativeColor + ';"></label>';
    }
  }
  colorChoicesElem.innerHTML += '<input type="radio" id="color-' + i + '" name="color-choice" class="color-choice" data-color="' + newColor + '"><label for="color-' + i + '" style="background-color:' + newColor + ';"></label>';

  correctColor = newColor;
  shuffleChoices();
}

function createMoreRelativeColors(colorArray, variance) {
  let relativeColorArray = [];
  colorArray.forEach(function(i){
    calculateMinMaxVariance(i, variance);
    relativeColorArray.push(Math.round(Math.random() * (finalMinMax[1] - finalMinMax[0]) + finalMinMax[0]));
  });
  return 'rgb(' + relativeColorArray[0] + ',' + relativeColorArray[1] + ',' + relativeColorArray[2] + ')';
}

function calculateMinMaxVariance(colorValue, variance) {
  let minMaxValues = [],
      addToMax     = 0,
      addToMin     = 0;

  // Set Minimum value
  if (colorValue - variance <= 0) {
    addToMax = (colorValue - variance) * -1;
    minMaxValues.push(0);
  } else {
    minMaxValues.push(colorValue - variance);
  }

  // Set maximum value
  if (colorValue + variance >= 255) {
    addToMin = (colorValue + variance) - 255;
    minMaxValues.push(255)
  } else {
    minMaxValues.push(colorValue + variance);
  }

  // Add in extra values if needed
  let min = minMaxValues[0] + addToMin,
      max = minMaxValues[1] + addToMax;
      finalMinMax = [min, max];
  
  return finalMinMax;
}

function resetGameState() {
  gameContainer.className = 'color-memory';
}

function setProgressBar(elem, duration, color) {
  var progressBarElem = document.querySelector(elem);
  var progressBarInner = document.querySelector('.progress')
  progressBarInner.style.background = color;

  progressBarInner.style.animationDuration = duration;
  progressBarElem.appendChild(progressBarInner);
  progressBarInner.style.animationPlayState = 'running';

  progressBarInner.addEventListener('animationend', showColorChoices);
}

function showColorChoices() {
  resetGameState();
  gameContainer.classList.add(gameStates[3]);
  determineResults();
}

function shuffleChoices() {
  var ul = colorChoicesElem;
  for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}

function determineResults() {
  var choices = document.querySelectorAll('.color-choice');
  var choice = null;
  for (i = 0; i < choices.length; i++) {
    choices[i].onclick = function() {
      choice = this.dataset.color;
      let choiceAsArray = choice.substring(4,choice.length - 1).split(',');
      let correctColorAsArray = correctColor.substring(4,choice.length - 1).split(',');

      if (choice == correctColor) {
        document.querySelector('.color-memory__results--condition').innerHTML = 
        '<h2 class="heading">Congratulations, you chose the correct color!</h2>\
        <div class="color-group">\
        <span class="label">Correct Color</span>\
        <span class="color-swatch" style="background-color:' + correctColor + '"></span>\
        </div>\
        <div class="color-group">\
        <span class="label">Chosen Color</span>\
        <span class="color-swatch" style="background-color:' + choice + '"></span>\
        </div>'
      } else {
        const redOffByValue = choiceAsArray[0] - correctColorAsArray[0];
        const greenOffByValue = choiceAsArray[1] - correctColorAsArray[1];
        const blueOffByValue = choiceAsArray[2] - correctColorAsArray[2];
        document.querySelector('.color-memory__results--condition').innerHTML = '<h2 class="heading">Sorry, you chose the wrong color.</h2>\
        <p>Your red value was off by ' + redOffByValue + '</p>\
        <p>Your green value was off by ' + greenOffByValue + '</p>\
        <p>Your blue value was off by ' + blueOffByValue + '</p>\
        <div class="color-group">\
        <span class="label">Correct Color</span>\
        <span class="color-swatch" style="background-color:' + correctColor + '"></span>\
        </div>\
        <div class="color-group">\
        <span class="label">Chosen Color</span>\
        <span class="color-swatch" style="background-color:' + choice + '"></span>\
        </div>'
      }
      resetGameState();
      gameContainer.classList.add(gameStates[4]);
      document.querySelector('.color-memory__results--cta').addEventListener('click', startGame);
      console.log(choice, correctColor);
      document.querySelector('.color-memory__phase3--choices').innerHTML = '';
    }
  }
}