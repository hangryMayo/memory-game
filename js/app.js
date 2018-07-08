const cardIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

const cardDeck = document.querySelector('.deck');
const resetButton = document.querySelector('.restart');
let cardElements = document.getElementsByClassName('card');
let allCards = Array.from(cardElements);
let openCards = [];

// move variables
const moveContainer = document.querySelector('.moves');
let moves = 0;

// star variable
const starElements = document.querySelectorAll('.fa-star');
let stars = Array.from(starElements);

// timer variables
const timerContainer = document.querySelector('.timer');
let seconds = 0, minutes = 0;
let timer;

function generateBoard() {
  cardDeck.innerHTML = '';

  shuffle(cardIcons);
  createDeck();
  // reset timer
  timerContainer.innerHTML = '00:00:00';
  clearInterval(timer);
  // reset move count
  moves = 0;
  moveContainer.innerHTML = moves;
  // reset star count
  for (i = 0; i < 3; i++) {
    stars[i].style.visibility = 'visible';
  }
}

function createDeck() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 16; i++) {
    const newLi = document.createElement('li');
    newLi.classList.add('card');
    newLi.addEventListener('click', flipCard);
    newLi.addEventListener('click', openList);

    const newI = document.createElement('i');
    newI.classList.add('fa');
    newI.classList.add(cardIcons[i]);

    newLi.appendChild(newI);
    fragment.appendChild(newLi);
  }

  cardDeck.appendChild(fragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function openList() {
  openCards.push(this);

  if (openCards.length === 2) {
    moveCounter();

    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      cardMatch();
      console.log("IT'S A MATCH");
    } else {
      cardClash();
      console.log("NOT A MATCH");
    }
  }
}

function flipCard() {
  this.classList.add('open');
  this.classList.add('show');
}

function cardMatch() {
  openCards[0].classList.add('match');
  openCards[0].classList.remove('open', 'show');

  openCards[1].classList.add('match');
  openCards[1].classList.remove('open', 'show');

  openCards = [];
}

function cardClash() {
  setTimeout(function() {
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
  }, 600);
}

function timerStart() {
  seconds = 0, minutes = 0;
  timer = setInterval(function(){
        timerContainer.innerHTML = '00:' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            minutes = 0;
        }
    }, 1000);
}

function moveCounter() {
  moves++;
  moveContainer.innerHTML = moves;
  // start timer based on moves
  if (moves == 1) {
    timerStart();
  }
  // star rating  based on moves
  if (moves > 8 && moves <= 16) {
    stars[2].style.visibility = 'hidden';
  } else if (moves > 16) {
    stars[2].style.visibility = 'hidden';
    stars[1].style.visibility = 'hidden';
  }
}

function resetGame(){
  allCards.forEach(function(card) {
    card.classList.remove('open', 'show');
  });

  generateBoard();
}

window.onload = generateBoard();

resetButton.addEventListener('click', resetGame);
