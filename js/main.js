$(function () {



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
  var starterCard = []
  var starterArray = starterCard.push(cards)

  deckArray.push(starterCard);
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

    var pOneStart = deck1.createStartMove()


    splitArrayLeft = splitDeck(pOneStart)
    // console.log(splitArrayLeft);
    // console.log("here");
    //
    //
    // console.log(splitArrayLeft)


    drawStarterCardsLeft(pOneStart)
    talon1 = deck1.createTalon();


    var pTwoStart = deck2.createStartMove()

    splitArrayRight = splitDeck(pTwoStart)
    // console.log(splitArrayRight);


    drawStarterCardsRight(pTwoStart)
    talon2 = deck2.createTalon();



    $("#startGame").hide();

    turn = "X"


    function play(deck, player) {
      var pOneDraw = deck.drawCard();
      player(pOneDraw)
      var pOneNewCard = splitCard(pOneDraw)

      return pOneNewCard


    }

//  CLICK FUNCTIONS

  $("#player1FaceDown").click(function () {
    if (turn == "X") {

    var drawnCardSplit = play(deck1, drawCardPlayer1)
    console.log(drawnCardSplit);

    }

    var aceArray = [[],[],[],[],[],[],[],[]]


  $("#player1FaceUp").click(function () {

    playerTurnLeftArray(1, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnRightArray(1, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnAcePile(1, "acePile", "FaceUp", aceArray, drawnCardSplit)


    $("#player1FaceUp").off("click")

  });
})

  $("#player2FaceDown").click(function () {
    if (turn == "Y") {
      console.log(turn);
      var drawnCardSplit = play(deck2, drawCardPlayer2)
      console.log(drawnCardSplit);
    }


    $("#player2FaceUp").click(function () {

      playerTurnLeftArray(2, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
      playerTurnRightArray(2, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);


      $("#player2FaceUp").off("click")

    });
  });






  // $("#player1Talon").click(function () {
  //   if ($("#player1Talon img").length < 2 && turn == "X") {
  //
  //
  //   console.log($("#player1Talon").length);
  //   var talonCard = drawTalonCard(talon1)
  //   player1Talon(talonCard);
  //   var pOneNewTalonCard = splitCard(talonCard)
  //   console.log(pOneNewTalonCard);
  //   player1turn (1, "solitairePile", "Talon", splitArrayLeft, splitArrayRight, pOneNewTalonCard)
  //   player1turn (1, "acePile", "Talon", splitArrayLeft, splitArrayRight, pOneNewTalonCard)
  // }
  //
  // });
  //
  // $("#player2Talon").click(function () {
  //   if ($("#player2Talon img").length <= 1 && turn == "Y") {
  //
  //     var talonCard = drawTalonCard(talon2)
  //     player2Talon(talonCard);
  //     var pOneNewTalonCard = splitCard(talonCard)
  //     console.log(pOneNewTalonCard);
  //     player1turn (2, "solitairePile", "Talon", splitArrayLeft, splitArrayRight, pOneNewTalonCard)
  //     player1turn (2, "acePile", "Talon", splitArrayLeft, splitArrayRight, pOneNewTalonCard)
  // }
  //
  // });






  // PLAYER 1 LEFT HAND SIDE




    function playerTurnLeftArray(playerTurn, id, pileType, splitArrayLeft, splitArrayRight, splitCard) {


    if (id == "solitairePile" && ((splitArrayLeft[0][splitArrayLeft[0].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Clubs" || splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Hearts" || splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {

      $("#" + id + "1").click(function () {

        $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '1 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayLeft[0].push(splitCard)
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '1 img').addClass("offsetLeft")
        $("#" + id + "1").off("click");
      });
    }

    else if (id == "solitairePile" && ((splitArrayLeft[1][splitArrayLeft[1].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Clubs" || splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Hearts" || splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {


      $("#" + id + "3").click(function () {

        $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '3 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayLeft[1].push(splitCard)

        $('#' + id + '3 img').addClass("offsetLeft")
        $("#" + id + "3").off("click");

      })
    }

    else if ((splitArrayLeft[2][splitArrayLeft[2].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Clubs" || splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Hearts" || splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

      $("#" + id + "5").click(function () {

        $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '5 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayLeft[2].push(splitCard)
        console.log(splitArrayLeft[2]);
        $('#' + id + '5 img').addClass("offsetLeft")
        $("#" + id + "5").off("click");


      })
    }

    else if ((splitArrayLeft[3][splitArrayLeft[3].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[3][splitArrayLeft[3].length - 1][2] == "Clubs" || splitArrayLeft[3][splitArrayLeft[3].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[3][splitArrayLeft[3].length - 1][2] == "Hearts" || splitArrayLeft[3][splitArrayLeft[3].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

      $("#" + id + "7").click(function () {

        $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '7 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayLeft[3].push(splitCard)
        console.log(splitArrayLeft[3]);
        $('#' + id + '7 img').addClass("offsetLeft")
        $("#" + id + "7").off("click");

      })
    }
    return splitArrayLeft
    }

    function playerTurnRightArray(playerTurn, id, pileType, splitArrayLeft, splitArrayRight, splitCard) {


    if (id == "solitairePile" && (splitArrayRight[0][splitArrayRight[0].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Clubs" || splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Hearts" || splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {

      $("#" + id + "2").click(function () {

        $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '2 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayLeft[0].push(splitCard)
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '2 img').addClass("noOffset")
        $("#" + id + "2").off("click");
      });
    }

    else if (splitArrayRight[1][splitArrayRight[1].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Clubs" || splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Hearts" || splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

      $("#" + id + "4").click(function () {

        $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '4 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayRight[1].push(splitCard)
        console.log(splitArrayRight[1]);
        $('#' + id + '4 img').addClass("noOffset")
        $("#" + id + "4").off("click");

      })
    }

    else if (splitArrayRight[2][splitArrayRight[2].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Clubs" || splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Hearts" || splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

      $("#" + id + "6").click(function () {

        $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '6 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayRight[2].push(splitCard)
        console.log(splitArrayRight[2]);
        $('#' + id + '6 img').addClass("noOffset")
        $("#" + id + "6").off("click");


      })
    }

    else if (splitArrayRight[3][splitArrayRight[3].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Clubs" || splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Hearts" || splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

      $("#" + id + "8").click(function () {

        $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '8 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        splitArrayRight[3].push(splitCard)
        console.log(splitArrayRight[3]);
        $('#' + id + '8 img').addClass("noOffset")
        $("#" + id + "8").off("click");

      })
    }
    return splitArrayRight
    }



    function playerTurnAcePile(playerTurn, id, pileType, aceArray, splitCard) {


    if (id == "acePile" && ($("#" + id + "1 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "1").click(function () {

        $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '1 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[0].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '1 img').addClass("offsetLeft")
        $("#" + id + "1").off("click");
      });
    }


    else if (id == "acePile" && ($("#" + id + "2 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "2").click(function () {

        $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '2 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[1].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '2 img').addClass("offsetLeft")
        $("#" + id + "2").off("click");
      });
    }

    else if (id == "acePile" && ($("#" + id + "3 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "3").click(function () {

        $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '3 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[2].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '3 img').addClass("offsetLeft")
        $("#" + id + "3").off("click");
      });
    }


    else if (id == "acePile" && ($("#" + id + "4 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "4").click(function () {

        $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '4 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[3].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '4 img').addClass("offsetLeft")
        $("#" + id + "4").off("click");
      });
    }


    else if (id == "acePile" && ($("#" + id + "5 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "5").click(function () {

        $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '5 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[4].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '5 img').addClass("offsetLeft")
        $("#" + id + "5").off("click");
      });
    }

    else if (id == "acePile" && ($("#" + id + "6 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "6").click(function () {

        $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '6 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[5].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '6 img').addClass("offsetLeft")
        $("#" + id + "6").off("click");
      });
    }

    else if (id == "acePile" && ($("#" + id + "7 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "7").click(function () {

        $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '7 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[6].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '7 img').addClass("offsetLeft")
        $("#" + id + "7").off("click");
      });
    }


    else if (id == "acePile" && ($("#" + id + "8 img").length == 0) && splitCard[0] == 1) {

      $("#" + id + "8").click(function () {

        $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
        $('#' + id + '8 img').removeClass("cardPile")
        // $('#solitairePile1 img').css("z-index", "1")
        // splitArrayLeft[0].push(splitCard)
        aceArray[7].push(splitCard);

        // console.log(aceArray);
        // console.log(splitArrayLeft[0][splitArrayLeft[0].length - 1]);
        // console.log(splitArrayLeft[0]);
        // console.log(splitArrayLeft);
        $('#' + id + '8 img').addClass("offsetLeft")
        $("#" + id + "8").off("click");
      })
    }
    console.log(aceArray);
    return aceArray
  }




























    // else if (id == "acePile" && ($("#" + id + "1 img").length == 0) && splitCard[0] == 1) {
    //   $("#" + id + "1").click(function () {
    //
    //     $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
    //     $('#' + id + '1 img').removeClass("cardPile")
    //     // $('#solitairePile1 img').css("z-index", "1")
    //     // var topCard0 = splitArrayLeft[0]
    //     // topCard = splitCard;
    //     // console.log(topCard);
    //     $('#' + id + '1 img').addClass("offsetLeft")
    //
    //   })
    //
    //
    // }





    // else if (id == "acePile" && ($("#" + id + "1 img").length > 1) && splitCard[0] == 1) {
    //   $("#" + id + "1").click(function () {
    //
    //     $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
    //     $('#' + id + '1 img').removeClass("cardPile")
    //     // $('#solitairePile1 img').css("z-index", "1")
    //     var topCard0 = splitArrayLeft[0]
    //     topCard = splitCard;
    //     console.log(topCard);
    //     $('#' + id + '1 img').addClass("offsetLeft")
    //
    //   })
    //
    //
    // }



//   $("#player" + playerTurn + pileType).click(function () {
//
    // if (splitArrayLeft[1][0][0] - splitCard[0] == 1 && ((splitArrayLeft[1][0][2] == "Clubs" || splitArrayLeft[1][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[1][0][2] == "Hearts" || splitArrayLeft[1][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
    //
    //   $("#" + id + "3").click(function () {
    //
    //     $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
    //     $('#' + id + '3 img').removeClass("cardPile")
    //     // $('#solitairePile1 img').css("z-index", "1")
    //     splitArrayLeft[1].push(splitCard)
    //     console.log(splitArrayLeft[1]);
    //     $('#' + id + '3 img').addClass("offsetLeft")
    //
    //   })
    // }
//
//     else if (id == "acePile" && ($("#" + id + "3 img").length == 0) && splitCard[0] == 1) {
//       $("#" + id + "1").click(function () {
//
//         $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//         $('#' + id + '3 img').removeClass("cardPile")
//         // $('#solitairePile1 img').css("z-index", "1")
//         // var topCard1 = splitArrayLeft[1]
//         // topCard = splitCard;
//         // console.log(topCard);
//         $('#' + id + '3 img').addClass("offsetLeft")
//
//       })
//     }
//
//     $("#player" + playerTurn + pileType).off("click")
//
//   })
//
  // $("#player" + playerTurn + pileType).click(function () {

    // if (splitArrayLeft[2][0][0] - splitCard[0] == 1 && ((splitArrayLeft[2][0][2] == "Clubs" || splitArrayLeft[2][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[2][0][2] == "Hearts" || splitArrayLeft[2][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
    //
    //   $("#" + id + "5").click(function () {
    //
    //     $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
    //     $('#' + id + '5 img').removeClass("cardPile")
    //     // $('#solitairePile1 img').css("z-index", "1")
    //     splitArrayLeft[2].push(splitCard)
    //     console.log(splitArrayLeft[2]);
    //     $('#' + id + '5 img').addClass("offsetLeft")
    //
    //   })
    // }
//
//     else if (id == "acePile" && ($("#" + id + "5 img").length == 0) && splitCard[0] == 1) {
//       $("#" + id + "5").click(function () {
//
//         $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//         $('#' + id + '5 img').removeClass("cardPile")
//         // $('#solitairePile1 img').css("z-index", "1")
//         // var topCard1 = splitArrayLeft[2]
//         // topCard = splitCard;
//         // console.log(topCard);
//         $('#' + id + '5 img').addClass("offsetLeft")
//
//       })
//     }
//
//     $("#player" + playerTurn + pileType).off("click")
//
//   })
//
//   $("#player" + playerTurn + pileType).click(function () {
//
    // if (splitArrayLeft[3][0][0] - splitCard[0] == 1 && ((splitArrayLeft[3][0][2] == "Clubs" || splitArrayLeft[3][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[3][0][2] == "Hearts" || splitArrayLeft[3][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
    //
    //   $("#" + id + "7").click(function () {
    //
    //     $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
    //     $('#' + id + '7 img').removeClass("cardPile")
    //     // $('#solitairePile1 img').css("z-index", "1")
    //     splitArrayLeft[3].push(splitCard)
    //     console.log(splitArrayLeft[3]);
    //     $('#' + id + '7 img').addClass("offsetLeft")
    //   })
    // }
//
//     else if (id == "acePile" && ($("#" + id + "7 img").length == 0) && splitCard[0] == 1) {
//       $("#" + id + "7").click(function () {
//
//         $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//         $('#' + id + '7 img').removeClass("cardPile")
//         // $('#solitairePile1 img').css("z-index", "1")
//         // var topCard1 = splitArrayLeft[3]
//         // topCard = splitCard;
//         // console.log(topCard);
//         $('#' + id + '7 img').addClass("offsetLeft")
//
//       })
//     }
//
//     $("#player" + playerTurn + pileType).off("click")
//
//   })
//
//
//   // PLAYER 1 RIGHT HAND SIDE
//
//   $("#player" + playerTurn + pileType).click(function () {
//
//     if (splitArrayRight[0][0][0] - splitCard[0] == 1 && ((splitArrayRight[0][0][2] == "Clubs" || splitArrayRight[0][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[0][0][2] == "Hearts" || splitArrayRight[0][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
//
//     $("#" + id + "2").click(function () {
//       console.log();
//       $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '2 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       splitArrayRight[0].push(splitCard)
//       console.log(splitArrayRight[0]);
//       $('#' + id + '2 img').addClass("noOffset")
//     })
//   }
//
//   else if (id == "acePile" && ($("#" + id + "2 img").length == 0) && splitCard[0] == 1) {
//     $("#" + id + "2").click(function () {
//
//       $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '2 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       // var topCard1 = splitArrayLeft[0]
//       // topCard = splitCard;
//       // console.log(topCard);
//       $('#' + id + '2 img').addClass("offsetLeft")
//
//     })
//   }
//
//     $("#player" + playerTurn + pileType).off("click")
//   })
//
//   $("#player" + playerTurn + pileType).click(function () {
//
//     if (splitArrayRight[1][0][0] - splitCard[0] == 1 && ((splitArrayRight[1][0][2] == "Clubs" || splitArrayRight[1][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[1][0][2] == "Hearts" || splitArrayRight[1][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
//
//     $("#" + id + "4").click(function () {
//
//       $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '4 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       splitArrayRight[1].push(splitCard)
//       console.log(splitArrayRight[1]);
//       $('#' + id + '4 img').addClass("noOffset")
//     })
//   }
//
//   else if (id == "acePile" && ($("#" + id + "4 img").length == 0) && splitCard[0] == 1) {
//     $("#" + id + "4").click(function () {
//
//       $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '4 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       // var topCard1 = splitArrayLeft[1]
//       // topCard = splitCard;
//       // console.log(topCard);
//       $('#' + id + '4 img').addClass("offsetLeft")
//
//     })
//   }
//
//     $("#player" + playerTurn + pileType).off("click")
//   })
//
//   $("#player" + playerTurn + pileType).click(function () {
//
//     if (splitArrayRight[2][0][0] - splitCard[0] == 1 && ((splitArrayRight[2][0][2] == "Clubs" || splitArrayRight[2][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[2][0][2] == "Hearts" || splitArrayRight[2][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
//
//     $("#" + id + "6").click(function () {
//
//       $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '6 img').removeClass("cardPile")
//       splitArrayRight[2].push(splitCard)
//       console.log(splitArrayRight[2]);
//       // $('#solitairePile1 img').css("z-index", "1")
//       $('#' + id + '6 img').addClass("noOffset")
//     })
//   }
//
//   else if (id == "acePile" && ($("#" + id + "6 img").length == 0) && splitCard[0] == 1) {
//     $("#" + id + "6").click(function () {
//
//       $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '6 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       // var topCard1 = splitArrayLeft[2]
//       // topCard = splitCard;
//       // console.log(topCard);
//       $('#' + id + '6 img').addClass("offsetLeft")
//
//     })
//   }
//
//     $("#player" + playerTurn + pileType).off("click")
//   })
//
//   $("#player" + playerTurn + pileType).click(function () {
//
//     if (splitArrayRight[3][0][0] - splitCard[0] == 1 && ((splitArrayRight[3][0][2] == "Clubs" || splitArrayRight[3][0][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[3][0][2] == "Hearts" || splitArrayRight[3][0][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {
//
//     $("#" + id + "8").click(function () {
//
//       $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '8 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       splitArrayRight[3].push(splitCard)
//       console.log(splitArrayRight[3]);
//       $('#' + id + '8 img').addClass("noOffset")
//     })
//   }
//
//   else if (id == "acePile" && ($("#" + id + "8 img").length == 0) && splitCard[0] == 1) {
//     $("#" + id + "8").click(function () {
//
//       $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//       $('#' + id + '8 img').removeClass("cardPile")
//       // $('#solitairePile1 img').css("z-index", "1")
//       // var topCard1 = splitArrayLeft[3]
//       // topCard = splitCard;
//       // console.log(topCard);
//       $('#' + id + '8 img').addClass("offsetLeft")
//
//     })
//   }
//
//     $("#player" + playerTurn + pileType).off("click")
//   })
//
// }

// console.log($(".acePile"));
//
//
// $("#player1FaceUp").click(function () {
//
//   // if () {
//   //   for (var i = 0; i < $(".acePile").length; i++) { $($(".acePile")[i]).click(function () {
//   //     // $(".acePile")[i]).append( $('#player1FaceUp>img:last-child') );
//   //     // $('.ace img').removeClass("cardPile")
//   //     // // $('#solitairePile1 img').css("z-index", "1")
//   //     // splitArrayRight[1] = splitCard;
//   //     // console.log(splitArrayRight[1]);
//   //     // $('#solitairePile4 img').addClass("noOffset")
//   // } )}
//
//
//
//
//
//     // $('#solitairePile4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
//     // $('#solitairePile4 img').removeClass("cardPile")
//     // // $('#solitairePile1 img').css("z-index", "1")
//     // splitArrayRight[1] = splitCard;
//     // console.log(splitArrayRight[1]);
//     // $('#solitairePile4 img').addClass("noOffset")
//   })
// }

  // $("#player" + playerTurn + pileType).off("click")
// })

$("#endTurn").click(function () {
  console.log("End Turn");
  turn == "X" ? turn = "Y" : turn = "X";

})







})
});
