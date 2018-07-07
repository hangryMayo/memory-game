/*
 * Create a list that holds all of your cards
 */
const cardIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

const cardDeck = document.querySelector('.deck');
const resetButton = document.querySelector('.restart');
let cardElements = document.getElementsByClassName('card');
let allCards = Array.from(cardElements);
let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function generateBoard() {
  shuffle(cardIcons);
  createDeck();
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

function flipCard() {
  this.classList.add('open');
  this.classList.add('show');
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
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      cardMatch();
      console.log("IT'S A MATCH");
    } else {
      cardClash();
      console.log("NOT A MATCH");
    }
  }
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

function resetGame(){
  allCards.forEach(function(card) {
    card.classList.remove('open', 'show');
  });

  cardDeck.innerHTML = '';
  generateBoard();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

window.onload = generateBoard();

resetButton.addEventListener('click', resetGame);
