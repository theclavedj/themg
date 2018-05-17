const listCards = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"]; /* Create a list that holds all of your cards */

document.body.onload = startGame; /*starts the game on page load*/
const restart = document.querySelector(".restart"); /*DOM selection for restart button*/
const deck = document.querySelector('.deck'); /*DOM selector to get deck*/
let openCards = []; /*array of openCards*/
let matchedCards = 0; /*counter of matched cards*/
let time = 0; /* time counter*/
let tempArray = []; /*temporary array to hold cards*/
let isAnimating = true; /*animation for fliping the cards*/
let moves = 0; /*moves counter*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

function startGame() { /* loops through the listCards array and randomly shuffles them */
    let fullDeck = shuffle(listCards); /* shuffle the cards */
    let newCards = ''; /*variable for shuffled cards, declared later*/
    let tempArray = []; /*temporary array to hold cards*/
    let openCards = []; /*array of openCards*/
    matchedCards = 0; /*counter of matched cards*/
      deck.innerHTML = '';
      for (let i = 0; i < fullDeck.length; i++) { /*loop through the listcards*/
        newCards += '<li class="card"><i class="' + fullDeck[i] + '"></i></li>'; /*append new li class*/
        deck.innerHTML = newCards;
  }
  cardsListener();
}

  function flipCard() {
    this.classList.add('open', 'show'); /*adds css class open or show*/
    if (openCards.length < 2){
      openCards.push(this);
    }};
  if (openCards.length===2){
    if (openCards[0].innerHTML === openCards[1].innerHTML){
      pair();
     }
    else {
      noPair()
      };
}

function pair () {
  openCards[0].classList.add("match");
   openCards[1].classList.add("match");
   openCards[0].classList.remove("show", "open");
   openCards[1].classList.remove("show", "open");
   openCards = [];
   matchedCards++
}

function noPair () {
 setTimeout(function(){
       openCards[0].classList.remove("show", "open");
       openCards[1].classList.remove("show", "open");
       openCards = [];
   },1100)
}

function cardsListener() {

  let cards = deck.getElementsByClassName("card");
     for (let i=0; i < cards.length; i++) {
       cards[i].addEventListener('click', flipCard);
  }
}

restart.addEventListener("click", startGame);
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
