/* Create a list that holds all of your cards */
let cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor',  'fa fa-bolt',  'fa fa-cube', 'fa fa-leaf',  'fa fa-bicycle',  'fa fa-bomb'];
const listCards = [...cards, ...cards];

/*starts the game on page load*/
document.body.onload = startGame;
/*DOM selection for html restart icon*/
const restart = document.querySelector(".restart");
/*DOM selection for html restart icon*/
const playAgain = document.querySelector(".play-again");
/*DOM selector to get html deck*/
const deck = document.querySelector('.deck');
/*DOM selector to get the html moves class*/
const moves = document.querySelector(".moves");
/*DOM selector to get stars*/
const stars = document.querySelectorAll(".fa-star");
/*dom selector for the modal*/
const modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
/*inspired from https://www.w3schools.com/jsref/prop_node_textcontent.asp*/
moves.textContent = 0;
/*variable which will add a move for each click*/
let addMove = moves.textContent;
let matchedCards = document.getElementsByClassName("match");
/*array of openCards*/
let openCards = [];
/*initial value of matchedCards*/
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
/* loops through the listCards array and randomly shuffles them */
function startGame() {
    /* shuffle the array listCards */
    let fullDeck = shuffle(listCards);
    /*empty array of open cards when clicked*/
    let openCards = [];
    /*variable for shuffled cards, declared later*/
    let newCards = '';
    /*initial value of matched cards*/
    matchedCards = 0;
    moves.textContent = 0;
    addMove = moves.textContent;
    /*adds yellow stars at beggining*/
    for (var i= 0; i < stars.length; i++){
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
      /*loop through the listcards*/
        for (let i = 0; i < fullDeck.length; i++) {
        /*append new li class*/
          newCards += '<li class="card"><i class="' + fullDeck[i] + '"></i></li>';
            deck.innerHTML = newCards;
  }
  /*adds cardListener at start to the DOM*/
  cardsListener();
}

function flipCard() {
  /*adds css class open or show*/
  this.classList.add('open', 'show');
    /*adds one class on click*/
    if (openCards.length === 0){
      openCards.push(this);
    }

  else if (openCards.length == 1) {
    if (openCards[0] != this) {
      // only push if not the same card was clicked again
      openCards.push(this);
      }
    }
    /*if matches two cards on click*/
    if (openCards.length === 2) {
      counter();
      if (openCards[0].innerHTML === openCards[1].innerHTML){
        pair();
     }
     else {
       noPair();
      }
    openModal();
  }

/*if less than 11 clicks gets 3 stars, more than 16 gets 2 stars*/
    if (addMove > 11 && addMove < 16){
      for( i= 0; i < 3; i++){
        if(i > 1){
          stars[i].style.visibility = "collapse";
        }
      }
    }

  /*if 20 or more clicks gets 1 star*/
    else if (addMove > 20){
      for( i= 0; i < 3; i++){
        if(i > 0){
          stars[i].style.visibility = "collapse";
        }
      }
    }
  }

function counter() {
    addMove++;
    moves.innerHTML = addMove;

}
/*search in the array for identical cards*/
function pair () {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
  matchedCards++;
}

/*search in the array for identical cards, if no match flip them at 700ms*/
function noPair () {
  openCards[0].classList.add("noPair");
  openCards[1].classList.add("noPair");
  /*stops the possibility of clicking a third card*/
  disable();
  /*delay of animation after clicking two cards*/
  setTimeout (function(){
    openCards[0].classList.remove("show", "open", "noPair");
    openCards[1].classList.remove("show", "open", "noPair");
      /*when it isnt a match, allow player to click again on the cards*/
       enable();
       openCards = [];
    /*time of animation*/
  },600);
  }

/*both functions disable-enable are made inspired in the article from https://stackoverflow.com/questions/1755815/disable-all-click-events-on-page-javascript*/
function disable() {
  document.addEventListener("click",handler,true);
    function handler(e){
      /*if matches two cards on click*/
      if(openCards.length == 2) {
      /* avoids clicking a third card when 2 cards are open*/
      e.stopPropagation();
    }
  }
}
/*when it isnt a match, allow player to click again on the cards*/
function enable() {
  document.removeEventListener("click", handler,true);
    function handler(e){
      e.stopPropagation();
  }
}

/*loop through the DOM card deck and adds flipcard function to it*/
function cardsListener() {
  let cards = deck.getElementsByClassName("card");
  startTimer();
    for (let i=0; i < cards.length; i++) {
       cards[i].addEventListener('click', flipCard);
  }
}

/*timer function inspired from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#5-the-timer*/
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
let interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute+" min "+second+" sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1100);
}

/*shows the modal once the 8 pairs of cards have been matched*/
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

// When the user clicks the x, close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

//if user hits button play again ill start a new game
playAgain.addEventListener("click", startGame);
};

//if user clicks anywhere outside playagain, close the modal
playAgain.onclick = function () {
  modal.style.display = "none";
};
/*restarts the game when clicking proper icon*/
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
