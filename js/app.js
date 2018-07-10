// array of all card icons
const cardIcons = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-anchor",
  "fa-leaf",
  "fa-bicycle",
  "fa-diamond",
  "fa-bomb",
  "fa-leaf",
  "fa-bomb",
  "fa-bolt",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-cube"
];

// li.card parent container
const cardDeck = document.querySelector('.deck');

const resetButton = document.querySelector('.restart');

// card variables
let cardElements = document.getElementsByClassName('card');
let allCards = Array.from(cardElements);
let openCards = [];
let matchCards = [];

// move variables
const moveContainer = document.querySelector('.moves');
let moves = 0;
let totalTime = document.querySelector('#totalTime');
let totalStars = document.querySelector('#totalStars');
let totalMoves = document.querySelector('#totalMoves');

// star variable
const starContainer = document.querySelector('.stars');
const starElements = document.querySelectorAll('.fa-star');
let stars = Array.from(starElements);

// timer variables
const timerContainer = document.querySelector('.timer');
let seconds = 0, minutes = 0;
let timer;

// modal variables
const modal = document.querySelector('.modal');
const playAgainButton = document.getElementById('play-again');

/*
* ALL FUNCTIONS
*/
function generateBoard() {
  // clears board
  cardDeck.innerHTML = '';
  // reset match card
  matchCards = [];
  // shuffles card's icons
  shuffle(cardIcons);
  createDeck();
  // reset timer
  clearInterval(timer);
  timerContainer.innerHTML = '00:00:00';
  // reset move count
  moves = 0;
  moveContainer.innerHTML = moves;
  // reset star count
  for (i = 0; i < 3; i++) {
    stars[i].style.visibility = 'visible';
  }
}
// @description creates and assigns cards with icons and adds listener for cards
function createDeck() {
  const fragment = document.createDocumentFragment();
  // @description creates & appends li, i elements to hold cardIcons
  for (let i = 0; i < 16; i++) {
    const newLi = document.createElement('li');
    newLi.classList.add('card');

    const newI = document.createElement('i');
    newI.classList.add('fa');
    newI.classList.add(cardIcons[i]);

    // listens for clicks on all li.cards
    newLi.addEventListener('click', flipCard);
    newLi.addEventListener('click', openList);
    newLi.addEventListener('click', openModal);

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
// @description disables clicks while matching is occuring
function invalidChoice() {
  for (i = 0; i < cardElements.length; i++) {
    cardElements[i].classList.add('disable');
  };
}
// @description clears invalidChoice function so cards can be clicked on again
function validChoice() {
  for (i = 0; i < cardElements.length; i++) {
    cardElements[i].classList.remove('disable');
  };
}
// @description push current set of cards to openCards array & checks for matches
function openList() {
  openCards.push(this);

  if (openCards.length === 2) {
    moveCounter();
    invalidChoice();

    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      cardMatch();
      console.log("IT'S A MATCH");
    } else {
      cardClash();
      console.log("NOT A MATCH");
    }
  }
}
// @description adds class open and show to reveal cards
function flipCard() {
  this.classList.add('open', 'show', 'disable');
}
// @description adds class of match and removes class of open and show
function cardMatch() {
  openCards[0].classList.add('match', 'disable');
  openCards[1].classList.add('match', 'disable');

  matchCards.push(openCards[0]);
  matchCards.push(openCards[1]);

  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');

  openCards = [];
  validChoice();
}
// @description removes class open and show; openCards array reset to empty
function cardClash() {
  setTimeout(function() {
    openCards[0].classList.remove('open', 'show', 'disable');
    openCards[1].classList.remove('open', 'show', 'disable');

    openCards = [];
    validChoice();
  }, 600);
}
// @description starts timer
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
// @description increments move by 1 and adjusts star ratings
function moveCounter() {
  moves++;
  moveContainer.innerHTML = moves;
  // start timer based on moves
  if (moves == 1) {
    timerStart();
  }
  // star rating  based on moves
  if (moves > 13 && moves <= 20) {
    stars[2].style.visibility = 'hidden';
  } else if (moves > 20) {
    stars[2].style.visibility = 'hidden';
    stars[1].style.visibility = 'hidden';
  }
}
// @description resets game
function resetGame(){
  // @description flips all opened cards over
  allCards.forEach(function(card) {
    card.classList.remove('open', 'show');
  });

  generateBoard();
}
// @description opens congratulations modal
function openModal() {
  if (matchCards.length == 16) {
    clearInterval(timer);
    totalTime.innerHTML = timerContainer.innerHTML;

    modal.classList.add('show');

    totalMoves.innerHTML = moves;
    totalStars.innerHTML = starContainer.innerHTML;

    playAgain();
  }
}
// @description new game when play again button is clicked on
function playAgain() {
  playAgainButton.addEventListener('click', function() {
    modal.classList.remove('show');
    generateBoard();
  });
}

// @description generates/shuffles board when window loads/refreshes
window.onload = generateBoard();
// listens for reset button
resetButton.addEventListener('click', resetGame);
