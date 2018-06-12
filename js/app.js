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
const restart = document.querySelector(".restart"); /*DOM selection for html restart icon*/
const playAgain = document.querySelector(".play-again"); /*DOM selection for html restart icon*/
const deck = document.querySelector('.deck'); /*DOM selector to get html deck*/
const moves = document.querySelector(".moves");/*DOM selector to get the html moves class*/
const stars = document.querySelectorAll(".fa-star"); /*DOM selector to get stars*/
const modal = document.getElementById('myModal'); /*dom selector for the modal*/
const span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal
moves.textContent = 0; /*inspired from https://www.w3schools.com/jsref/prop_node_textcontent.asp*/
let addMove = moves.textContent; /*variable which will add a move for each click*/
let matchedCards = document.getElementsByClassName("match");
let openCards = []; /*array of openCards*/
matchedCards = 0;
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
    let openCards = []; /*array of openCards*/
    matchedCards = 0; /*initial value of matched cards*/

    moves.textContent = 0;
    addMove = moves.textContent;
    for (var i= 0; i < stars.length; i++){ /*adds yellow stars at beggining*/
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset the timer
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec"; /*adds counter at beggining*/
    clearInterval(interval); /*stops the time per https://www.w3schools.com/jsref/met_win_clearinterval.asp*/

      deck.innerHTML = '';
      for (let i = 0; i < fullDeck.length; i++) { /*loop through the listcards*/
        newCards += '<li class="card"><i class="' + fullDeck[i] + '"></i></li>'; /*append new li class*/
        deck.innerHTML = newCards;
  }
  cardsListener(); /*adds cardListener at start*/
}

  function flipCard() {
    this.classList.add('open', 'show'); /*adds css class open or show*/
    if (openCards.length == 0){ /*adds one class on click*/
    openCards.push(this);
  }
  else if (openCards.length == 1) {
    if (openCards[0] != this) {
      // only push if not the same card was clicked again
      openCards.push(this);
    }
  }
    if (openCards.length === 2) { /*if matches two cards on click*/
      if (openCards[0].innerHTML === openCards[1].innerHTML){
        pair();
     }
     else {
       noPair()
      };
      openModal()
}
addMove++; /*for each click adds a move to the counter*/

moves.innerText = addMove /*adds a move for any click on cards*/
  if(addMove === 1){ /*when one move is made counter starts*/
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
      }
  if (addMove > 22 && addMove < 28){ /*if less than 16 clicks gets 3 stars, more than 16 to 24 gets 2 stars*/
          for( i= 0; i < 3; i++){
              if(i > 1){
                  stars[i].style.visibility = "collapse";
              }
          }
      }
      else if (addMove > 36){ /*if 32 or more clicks gets 1 star*/
          for( i= 0; i < 3; i++){
              if(i > 0){
                  stars[i].style.visibility = "collapse";
              }
          }
      }
  }

function pair () { /*search in the array for identical cards*/
  openCards[0].classList.add("match");
   openCards[1].classList.add("match");
   openCards[0].classList.remove("show", "open");
   openCards[1].classList.remove("show", "open");
   openCards = [];
   matchedCards++
}

function noPair () {/*search in the array for identical cards, if no match turn them back at 600ms*/
 setTimeout(function(){
       openCards[0].classList.remove("show", "open");
       openCards[1].classList.remove("show", "open");
       openCards = [];
   },700)
}

function cardsListener() {/*loop through the DOM card deck and adds flipcard function to it*/

  let cards = deck.getElementsByClassName("card");
     for (let i=0; i < cards.length; i++) {
       cards[i].addEventListener('click', flipCard);
  }
}
let second = 0, minute = 0; hour = 0; /*timer function inspired on https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#5-the-timer*/
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"min "+second+"sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
restart.addEventListener("click", startGame); /*restarts the game when clicking proper icon*/

function openModal() {
    if (matchedCards === 8){
    modal.style.display = "block";
    clearInterval(interval);
    finalTime = timer.innerHTML;
    finalMove = moves.textContent;
    finalMove++;
    const starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = finalMove;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
}
}
span.onclick = function() { // When the user clicks the x, close the modal
    modal.style.display = "none";
}
window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }

playAgain.addEventListener("click", startGame); //if user hits button play again ill start a new game
}
playAgain.onclick = function () {
  modal.style.display = "none"; //if user clicks anywhere outside playagain, close the modal
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
