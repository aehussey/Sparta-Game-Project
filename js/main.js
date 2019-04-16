$(function () {

console.log("hello");

//  FUNCTIONS

function drawStarterCardsLeft(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {

    $($(".solitairePileLeft")[i]).append('<img src="images/card-images/' + createStartMove[i] + '.png">');

  }
}

function drawStarterCardsRight(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {
    $($(".solitairePileRight")[i]).append('<img src="images/card-images/' + createStartMove[i] + '.png">');

  }
}

function drawFirstCard(card1, card2) {
  $("#player1FaceUp").append('<img src="images/card-images/' + card1 + '.png">');
  $("#player2FaceUp").append('<img src="images/card-images/' + card2 + '.png">');
}

function drawCardPlayer1(card) {
  $("#player1FaceUp").append('<img src="images/card-images/' + card + '.png">');
  $("#player1FaceUp img").addClass("cardPile");

}

function drawCardPlayer2(card) {
  $("#player2FaceUp").append('<img src="images/card-images/' + card + '.png">');
  $("#player2FaceUp img").addClass("cardPile");

}

function drawTalonCard(talonArray) {

  return talonArray.pop();

}
function player1Talon(card) {
  $("#player1Talon").append('<img src="images/card-images/' + card + '.png">');
  $("#player1Talon img").addClass("cardPile");
}

function player2Talon(card) {
  $("#player2Talon").append('<img src="images/card-images/' + card + '.png">');
  $("#player2Talon img").addClass("cardPile");
}



// DECK OF CARDS



class Deck {
  constructor() {
    this.deck = [];

    var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    var values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (var suit in suits) {
      for (var value in values) {
        this.deck.push(`${values[value]}-of-${suits[suit]}`);
      }
    }
  }
  shuffle() {
    const deck = this.deck;
    var m = deck.length, i;
    while (m) {
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  createTalon(){
    var talonArray = [];
    for (var i = 0; i < 13; i++) {
      talonArray.push(this.deck.pop())
    }

  return talonArray;
}



  createStartMove () {
    var startMoveArray = [];
    for (var i = 0; i < 4; i++) {
      startMoveArray.push(this.deck.pop())
    }

  return startMoveArray;

  }

  drawCard () {
    return this.deck.pop();
  }
}

// CLICKS AND BUTTONS

  $("#startGame").click(function(){

    deck1 = new Deck();
    deck1.shuffle();

    deck2 = new Deck();
    deck2.shuffle();

    drawFirstCard (deck1.drawCard(), deck2.drawCard())

    drawStarterCardsLeft(deck1.createStartMove())
    talon1 = deck1.createTalon();
    console.log(deck1.deck);


    drawStarterCardsRight(deck2.createStartMove())
    talon2 = deck2.createTalon();
    console.log(deck2.deck);


    $("#startGame").hide();

    turn = "X"


  });


  $("#player1FaceUp").click(function () {
    if (turn == "X") {
      drawCardPlayer1(deck1.drawCard())
      console.log(deck1.deck);
    }

  })

  $("#player2FaceUp").click(function () {
    if (turn == "Y") {
      drawCardPlayer2(deck2.drawCard())
      console.log(deck2.deck);
    }

  });



  $("#player1Talon").click(function () {
    if ($("#player1Talon img").length <= 1 && turn == "X") {

    // drawTalonCard(deck1.createTalon());
    console.log($("#player1Talon").length); // why does this not repeat when i press

    player1Talon(drawTalonCard(talon1));
    console.log(talon1);
  }

  });

  $("#player2Talon").click(function () {
    if ($("#player2Talon img").length <= 1 && turn == "Y") {

    // drawTalonCard(deck1.createTalon());
    console.log($("#player2Talon").length); // why does this not repeat when i press

    player2Talon(drawTalonCard(talon2));
    console.log(talon2);
  }

  });


$("#endTurn").click(function () {
  console.log("End Turn");
  turn == "X" ? turn = "Y" : turn = "X"

})



});
