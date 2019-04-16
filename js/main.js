$(function () {

console.log("hello");

//  FUNCTIONS

function drawStarterCardsLeft(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {

    $($(".solitairePileLeft")[i]).append('<img src="images/card-images/' + createStartMove[i] + '.png">');
    $(".solitairePileLeft img").addClass("firstCardLeft");

  }


}

function drawStarterCardsRight(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {
    // console.log(createStartMove[i]);
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

function splitDeck (deck) {
  var deckArray = []
  for (var i = 0; i < deck.length; i++) {
  // deckArray.push();
  var cards = deck[i].split("-");
  deckArray.push(cards)
}
return deckArray;
}

function splitCard (cardName) {


  var card = cardName.split("-");


  return card
}



// DECK OF CARDS



class Deck {
  constructor() {
    this.deck = [];

    var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
    var newDeck = splitDeck (startMoveArray)

  return startMoveArray;

  }

  drawCard () {

    var card = this.deck.pop();




    return card
  }
}

// START GAME

  $("#startGame").click(function(){

    deck1 = new Deck();
    deck1.shuffle();

    deck2 = new Deck();
    deck2.shuffle();

    // console.log(deck1.deck);


//Draw 1st card

    var pOneFirstCard = deck1.drawCard()
    var pOneNewCard = splitCard (pOneFirstCard)
    console.log(pOneNewCard);


    var pTwoFirstCard = deck2.drawCard()
    var pTwoNewCard = splitCard (pTwoFirstCard)
    console.log(pTwoNewCard);



    drawFirstCard (pOneFirstCard, pTwoFirstCard)

    var pOneStart = deck1.createStartMove()


    pOneNewDeck = splitDeck(pOneStart)
    console.log(pOneNewDeck);


    console.log(pOneNewDeck);


    drawStarterCardsLeft(pOneStart)
    talon1 = deck1.createTalon();
    // console.log(talon1);
    // console.log(deck1.deck);

    // console.log(splitTalon1);


    // drawStarterCardsRight(deck2.createStartMove())
    // talon2 = deck2.createTalon();
    // console.log(deck2.deck);

    var pTwoStart = deck2.createStartMove()

    pTwoNewDeck = splitDeck(pTwoStart)
    console.log(pTwoNewDeck);


    drawStarterCardsRight(pTwoStart)
    talon2 = deck2.createTalon();
    // console.log(talon2);
    // console.log(deck2.deck);


    $("#startGame").hide();

    turn = "X"
    // console.log($("#player1FaceUp img:last-child"));

    // console.log([talon1 + deck1.deck])



//  CLICK FUNCTIONS

  $("#player1FaceDown").click(function () {
    if (turn == "X") {
      var pOneDraw = deck1.drawCard();
      drawCardPlayer1(pOneDraw)
      var pOneFlipCard = splitCard(pOneDraw)
      console.log(pOneFlipCard);
    }


  })

  $("#player2FaceDown").click(function () {
    if (turn == "Y") {
      drawCardPlayer2(deck2.drawCard())
      console.log(deck2.deck);
    }

  });






  $("#player1Talon").click(function () {
    if ($("#player1Talon img").length <= 1 && turn == "X") {


    console.log($("#player1Talon").length);

    player1Talon(drawTalonCard(talon1));
    console.log(talon1);
  }

  });

  $("#player2Talon").click(function () {
    if ($("#player2Talon img").length <= 1 && turn == "Y") {

    player2Talon(drawTalonCard(talon2));
    console.log(talon2);
  }

  });



  // }


  // PLAYER 1 LEFT HAND SIDE
  $("#player1FaceUp").click(function () {

    if (pOneNewDeck[0][0] - pOneNewCard[0] == 1 && ((pOneNewDeck[0][2] == "Clubs" || pOneNewDeck[0][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pOneNewDeck[0][2] == "Hearts" || pOneNewDeck[0][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

      $("#solitairePile1").click(function () {

        $('#solitairePile1').append( $('#player1FaceUp>img:last-child') );
        $('#solitairePile1 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[0] = pOneNewCard;
        console.log(pOneNewDeck[0]);
        $('#solitairePile1 img').addClass("offsetLeft")
      })
    }

    $("#player1FaceUp").off("click")

  })

  $("#player1FaceUp").click(function () {

    if (pOneNewDeck[1][0] - pOneNewCard[0] == 1 && ((pOneNewDeck[1][2] == "Clubs" || pOneNewDeck[1][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pOneNewDeck[1][2] == "Hearts" || pOneNewDeck[1][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

      $("#solitairePile3").click(function () {

        $('#solitairePile3').append( $('#player1FaceUp>img:last-child') );
        $('#solitairePile3 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[1] = pOneNewCard;
        console.log(pOneNewDeck[1]);
        $('#solitairePile3 img').addClass("offsetLeft")
      })
    }

    $("#player1FaceUp").off("click")

  })

  $("#player1FaceUp").click(function () {

    if (pOneNewDeck[2][0] - pOneNewCard[0] == 1 && ((pOneNewDeck[2][2] == "Clubs" || pOneNewDeck[2][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pOneNewDeck[2][2] == "Hearts" || pOneNewDeck[2][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

      $("#solitairePile5").click(function () {

        $('#solitairePile5').append( $('#player1FaceUp>img:last-child') );
        $('#solitairePile5 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[2] = pOneNewCard;
        console.log(pOneNewDeck[2]);
        $('#solitairePile5 img').addClass("offsetLeft")
      })
    }

    $("#player1FaceUp").off("click")

  })

  $("#player1FaceUp").click(function () {

    if (pOneNewDeck[3][0] - pOneNewCard[0] == 1 && ((pOneNewDeck[3][2] == "Clubs" || pOneNewDeck[3][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pOneNewDeck[3][2] == "Hearts" || pOneNewDeck[3][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

      $("#solitairePile7").click(function () {

        $('#solitairePile7').append( $('#player1FaceUp>img:last-child') );
        $('#solitairePile7 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[3] = pOneNewCard;
        console.log(pOneNewDeck[3]);
        $('#solitairePile7 img').addClass("offsetLeft")
      })
    }

    $("#player1FaceUp").off("click")

  })


  // PLAYER 1 RIGHT HAND SIDE

  $("#player1FaceUp").click(function () {

    if (pTwoNewDeck[0][0] - pOneNewCard[0] == 1 && ((pTwoNewDeck[0][2] == "Clubs" || pTwoNewDeck[0][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pTwoNewDeck[0][2] == "Hearts" || pTwoNewDeck[0][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

    $("#solitairePile2").click(function () {

      $('#solitairePile2').append( $('#player1FaceUp>img:last-child') );
      $('#solitairePile2 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[0] = pOneNewCard;
      console.log(pTwoNewDeck[0]);
      $('#solitairePile2 img').addClass("noOffset")
    })
  }

    $("#player1FaceUp").off("click")
  })

  $("#player1FaceUp").click(function () {

    if (pTwoNewDeck[1][0] - pOneNewCard[0] == 1 && ((pTwoNewDeck[1][2] == "Clubs" || pTwoNewDeck[1][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pTwoNewDeck[1][2] == "Hearts" || pTwoNewDeck[1][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

    $("#solitairePile4").click(function () {

      $('#solitairePile4').append( $('#player1FaceUp>img:last-child') );
      $('#solitairePile4 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[1] = pOneNewCard;
      console.log(pTwoNewDeck[1]);
      $('#solitairePile4 img').addClass("noOffset")
    })
  }

    $("#player1FaceUp").off("click")
  })

  $("#player1FaceUp").click(function () {

    if (pTwoNewDeck[2][0] - pOneNewCard[0] == 1 && ((pTwoNewDeck[2][2] == "Clubs" || pTwoNewDeck[2][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pTwoNewDeck[2][2] == "Hearts" || pTwoNewDeck[2][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

    $("#solitairePile6").click(function () {

      $('#solitairePile6').append( $('#player1FaceUp>img:last-child') );
      $('#solitairePile6 img').removeClass("cardPile")
      pTwoNewDeck[2] = pOneNewCard;
      console.log(pTwoNewDeck[2]);
      // $('#solitairePile1 img').css("z-index", "1")
      $('#solitairePile6 img').addClass("noOffset")
    })
  }

    $("#player1FaceUp").off("click")
  })

  $("#player1FaceUp").click(function () {

    if (pTwoNewDeck[3][0] - pOneNewCard[0] == 1 && ((pTwoNewDeck[3][2] == "Clubs" || pTwoNewDeck[3][2] == "Spades") && (pOneNewCard[2] == "Diamonds" || pOneNewCard[2] == "Hearts") || (pTwoNewDeck[3][2] == "Hearts" || pTwoNewDeck[3][2] == "Diamonds") && (pOneNewCard[2] == "Clubs" || pOneNewCard[2] == "Spades"))) {

    $("#solitairePile8").click(function () {

      $('#solitairePile8').append( $('#player1FaceUp>img:last-child') );
      $('#solitairePile8 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[3] = pOneNewCard;
      console.log(pTwoNewDeck[3]);
      $('#solitairePile8 img').addClass("noOffset")
    })
  }

    $("#player1FaceUp").off("click")
  })

  // PLAYER 2 LEFT HAND SIDE
  $("#player2FaceUp").click(function () {

    if (pOneNewDeck[0][0] - pTwoNewCard[0] == 1 && ((pOneNewDeck[0][2] == "Clubs" || pOneNewDeck[0][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pOneNewDeck[0][2] == "Hearts" || pOneNewDeck[0][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

      $("#solitairePile1").click(function () {

        $('#solitairePile1').append( $('#player2FaceUp>img:last-child') );
        $('#solitairePile1 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[0] = pTwoNewCard;
        console.log(pOneNewDeck[0]);
        $('#solitairePile1 img').addClass("offsetLeft")
      })
    }

    $("#player2FaceUp").off("click")

  })

  $("#player2FaceUp").click(function () {

    if (pOneNewDeck[1][0] - pTwoNewCard[0] == 1 && ((pOneNewDeck[1][2] == "Clubs" || pOneNewDeck[1][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pOneNewDeck[1][2] == "Hearts" || pOneNewDeck[1][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

      $("#solitairePile3").click(function () {

        $('#solitairePile3').append( $('#player2FaceUp>img:last-child') );
        $('#solitairePile3 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[1] = pTwoNewCard;
        console.log(pOneNewDeck[1]);
        $('#solitairePile3 img').addClass("offsetLeft")
      })
    }

    $("#player2FaceUp").off("click")

  })

  $("#player2FaceUp").click(function () {

    if (pOneNewDeck[2][0] - pTwoNewCard[0] == 1 && ((pOneNewDeck[2][2] == "Clubs" || pOneNewDeck[2][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pOneNewDeck[2][2] == "Hearts" || pOneNewDeck[2][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

      $("#solitairePile5").click(function () {

        $('#solitairePile5').append( $('#player2FaceUp>img:last-child') );
        $('#solitairePile5 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[2] = pTwoNewCard;
        console.log(pOneNewDeck[2]);
        $('#solitairePile5 img').addClass("offsetLeft")
      })
    }

    $("#player2FaceUp").off("click")

  })

  $("#player2FaceUp").click(function () {

    if (pOneNewDeck[3][0] - pTwoNewCard[0] == 1 && ((pOneNewDeck[3][2] == "Clubs" || pOneNewDeck[3][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pOneNewDeck[3][2] == "Hearts" || pOneNewDeck[3][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

      $("#solitairePile7").click(function () {

        $('#solitairePile7').append( $('#player2FaceUp>img:last-child') );
        $('#solitairePile7 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        pOneNewDeck[3] = pTwoNewCard;
        console.log(pOneNewDeck[3]);
        $('#solitairePile7 img').addClass("offsetLeft")
      })
    }

    $("#player2FaceUp").off("click")

  })



  // PLAYER 2 RIGHT HAND SIDE

  $("#player2FaceUp").click(function () {

    if (pTwoNewDeck[0][0] - pTwoNewCard[0] == 1 && ((pTwoNewDeck[0][2] == "Clubs" || pTwoNewDeck[0][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pTwoNewDeck[0][2] == "Hearts" || pTwoNewDeck[0][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

    $("#solitairePile2").click(function () {

      $('#solitairePile2').append( $('#player2FaceUp>img:last-child') );
      $('#solitairePile2 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[0] = pTwoNewCard;
      console.log(pTwoNewDeck[0]);
      $('#solitairePile2 img').addClass("noOffset")
    })
  }

    $("#player2FaceUp").off("click")
  })

  $("#player2FaceUp").click(function () {

    if (pTwoNewDeck[1][0] - pTwoNewCard[0] == 1 && ((pTwoNewDeck[1][2] == "Clubs" || pTwoNewDeck[1][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pTwoNewDeck[1][2] == "Hearts" || pTwoNewDeck[1][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

    $("#solitairePile4").click(function () {

      $('#solitairePile4').append( $('#player2FaceUp>img:last-child') );
      $('#solitairePile4 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[1] = pTwoNewCard;
      console.log(pTwoNewDeck[1]);
      $('#solitairePile4 img').addClass("noOffset")
    })
  }

    $("#player2FaceUp").off("click")
  })

  $("#player2FaceUp").click(function () {

    if (pTwoNewDeck[2][0] - pTwoNewCard[0] == 1 && ((pTwoNewDeck[2][2] == "Clubs" || pTwoNewDeck[2][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pTwoNewDeck[2][2] == "Hearts" || pTwoNewDeck[2][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

    $("#solitairePile6").click(function () {

      $('#solitairePile6').append( $('#player2FaceUp>img:last-child') );
      $('#solitairePile6 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[2] = pTwoNewCard;
      console.log(pTwoNewDeck[2]);
      $('#solitairePile6 img').addClass("noOffset")
    })
  }

    $("#player2FaceUp").off("click")
  })

  $("#player2FaceUp").click(function () {

    if (pTwoNewDeck[3][0] - pTwoNewCard[0] == 1 && ((pTwoNewDeck[3][2] == "Clubs" || pTwoNewDeck[3][2] == "Spades") && (pTwoNewCard[2] == "Diamonds" || pTwoNewCard[2] == "Hearts") || (pTwoNewDeck[3][2] == "Hearts" || pTwoNewDeck[3][2] == "Diamonds") && (pTwoNewCard[2] == "Clubs" || pTwoNewCard[2] == "Spades"))) {

    $("#solitairePile8").click(function () {

      $('#solitairePile8').append( $('#player2FaceUp>img:last-child') );
      $('#solitairePile8 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      pTwoNewDeck[3] = pTwoNewCard;
      console.log(pTwoNewDeck[3]);
      $('#solitairePile8 img').addClass("noOffset")
    })
  }

    $("#player2FaceUp").off("click")
  })
$("#endTurn").click(function () {
  console.log("End Turn");
  turn == "X" ? turn = "Y" : turn = "X"

})

console.log(pOneNewDeck[0][0] - pOneNewCard[0]);

if (pOneNewDeck[0][0] - pOneNewCard[0] == 1) {
  console.log(pOneNewCard);

}

$("#player1FaceUp").click(function () {

  if (pOneNewDeck[0][0] - pOneFlipCard[0] == 1 && ((pOneNewDeck[0][2] == "Clubs" || pOneNewDeck[0][2] == "Spades") && (pOneFlipCard[2] == "Diamonds" || pOneFlipCard[2] == "Hearts") || (pOneNewDeck[0][2] == "Hearts" || pOneNewDeck[0][2] == "Diamonds") && (pOneFlipCard[2] == "Clubs" || pOneFlipCard[2] == "Spades"))) {

    $("#solitairePile1").click(function () {

      $('#solitairePile1').append( $('#player1FaceUp>img:last-child') );
      $('#solitairePile1 img').removeClass("cardPile")
      // $('#solitairePile1 img').css("z-index", "1")
      $('#solitairePile1 img').addClass("offsetLeft")
    })
  }

  $("#player1FaceUp").off("click")

})

})
});
