$(function () {



                            //  Card FUNCTIONS

function drawStarterCardsLeft(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {

    $($(".solitairePileLeft")[i]).append('<img src="images/card-images/' + createStartMove[i] + '.png">');
    $(".solitairePileLeft img").addClass("firstCardLeft");

  }


}

function drawStarterCardsRight(createStartMove) {
  for (var i = 0; i < createStartMove.length; i++) {

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



function splitDeck (deck) {
  var deckArray = []
  for (var i = 0; i < deck.length; i++) {
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

$(document).ready(function(){
		$("#myModal").modal('show');
	});

                          // START GAME

  $("#startGame").click(function(){

    deck1 = new Deck();
    deck1.shuffle();

    deck2 = new Deck();
    deck2.shuffle();

    var pOneStart = deck1.createStartMove()


    splitArrayLeft = splitDeck(pOneStart)



    drawStarterCardsLeft(pOneStart)



    var pTwoStart = deck2.createStartMove()

    splitArrayRight = splitDeck(pTwoStart)



    drawStarterCardsRight(pTwoStart)




    $("#startGame").hide();

    turn = "X"


    var unusedDeckP1 = []
    var unusedDeckP2 = []

    function play(deck, player, unusedDeck) {
      var pOneDraw = deck.drawCard();
      player(pOneDraw)
      var pOneNewCard = splitCard(pOneDraw)
      unusedDeck.push(pOneDraw)
      console.log(unusedDeck);
      console.log(unusedDeck.length);
      console.log("here");




      return pOneNewCard


    }




    aceArray = [[],[],[],[],[],[],[],[]]


    // function backingColour(id) {
    //   $("#" + id img).mouseover(function () {$("#" + id).css("background-color", "yellow")})
    //   $("#" + id img).mouseout(function(){
    //       $("#" + id img).css("background-color", "white")})
    // }



                    //  CLICK FUNCTIONS

  $("#player1FaceDown").click(function () {
    if (turn == "X" && deck1.deck.length > 0) {

      backingColour("player1FaceDown")

      $("#player1FaceDown").mouseover(function (){$("#player1FaceDown").css("background-color", "yellow")})
      $("#player1FaceDown").mouseout(function(){
          $("#player1FaceDown").css("background-color", "white");
        })
    var drawnCardSplit = play(deck1, drawCardPlayer1, unusedDeckP1)
    console.log("length is " + deck1.deck.length);
    console.log(drawnCardSplit);


    }

    else if (turn == "X" && deck1.deck.length == 0) {
      for (var i = 0; i < unusedDeckP1.length; i++) {
        deck1.deck.push(unusedDeckP1[i])


      }
      unusedDeckP1 = []
      console.log(deck1.deck.length);
    }

    else if (turn == "X" && deck1.deck.length == 0 && unusedDeckP1.length == 0) {
      alert("WINNAAA")
    }



  $("#player1FaceUp").click(function () {
    backingColour("player1FaceUp")
    playerTurnLeftArray(1, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnRightArray(1, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnAcePile(1, "acePile", "FaceUp", aceArray, drawnCardSplit)
    playerBuildAcePile(1, "acePile", "FaceUp", aceArray, drawnCardSplit)



    $("#player1FaceUp").off("click")

  });
  })

  $("#player2FaceDown").click(function () {
    if (turn == "Y" && deck2.deck.length > 0) {

      backingColour("player2FaceDown")

      $("#player2FaceDown").mouseover(function (){$("#player2FaceDown").css("background-color", "yellow")})
      $("#player2FaceDown").mouseout(function(){
          $("#player2FaceDown").css("background-color", "white");
        })
    var drawnCardSplit = play(deck2, drawCardPlayer2, unusedDeckP2)
    console.log("length is " + deck2.deck.length);
    console.log(drawnCardSplit);


    }

    else if (turn == "Y" && deck2.deck.length == 0) {
      for (var i = 0; i < unusedDeckP2.length; i++) {
        deck1.deck.push(unusedDeckP2[i])


      }
      unusedDeckP2 = []
      console.log(deck2.deck.length);
    }

    else if (turn == "Y" && deck1.deck.length == 0 && unusedDeckP2.length == 0) {
      alert("WINNAAA")
    }



  $("#player2FaceUp").click(function () {
    backingColour("player1FaceUp")
    playerTurnLeftArray(2, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnRightArray(2, "solitairePile", "FaceUp", splitArrayLeft, splitArrayRight, drawnCardSplit);
    playerTurnAcePile(2, "acePile", "FaceUp", aceArray, drawnCardSplit)
    playerBuildAcePile(2, "acePile", "FaceUp", aceArray, drawnCardSplit)



    $("#player2FaceUp").off("click")

})
})


              // SOILTAIRE PILES LEFT HAND SIDE




    function playerTurnLeftArray(playerTurn, id, pileType, splitArrayLeft, splitArrayRight, splitCard) {



      if (id == "solitairePile" && ((splitArrayLeft[0][splitArrayLeft[0].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Clubs" || splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Hearts" || splitArrayLeft[0][splitArrayLeft[0].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {
        $("#" + id + "1").click(function () {

          $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '1 img').removeClass("cardPile")

          splitArrayLeft[0].push(splitCard)

          $('#' + id + '1 img').addClass("offsetLeft")
          $("#" + id + "1").off("click");
        });
      }

      else if (id == "solitairePile" && ((splitArrayLeft[1][splitArrayLeft[1].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Clubs" || splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Hearts" || splitArrayLeft[1][splitArrayLeft[1].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {


        $("#" + id + "3").click(function () {

          $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '3 img').removeClass("cardPile")

          splitArrayLeft[1].push(splitCard)

          $('#' + id + '3 img').addClass("offsetLeft")
          $("#" + id + "3").off("click");

        })
      }

      else if ((splitArrayLeft[2][splitArrayLeft[2].length - 1][0]) - splitCard[0] == 1 && ((splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Clubs" || splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Hearts" || splitArrayLeft[2][splitArrayLeft[2].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

        $("#" + id + "5").click(function () {

          $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '5 img').removeClass("cardPile")

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

          splitArrayLeft[3].push(splitCard)
          console.log(splitArrayLeft[3]);
          $('#' + id + '7 img').addClass("offsetLeft")
          $("#" + id + "7").off("click");

        })
      }
      return splitArrayLeft
    }


              //  SOILTAIRE PILES RIGHT SIDE



    function playerTurnRightArray(playerTurn, id, pileType, splitArrayLeft, splitArrayRight, splitCard) {


      if (id == "solitairePile" && (splitArrayRight[0][splitArrayRight[0].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Clubs" || splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Hearts" || splitArrayRight[0][splitArrayRight[0].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades")))) {

        $("#" + id + "2").click(function () {

          $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '2 img').removeClass("cardPile")

          splitArrayLeft[0].push(splitCard)

          $('#' + id + '2 img').addClass("noOffset")
          $("#" + id + "2").off("click");
        });
      }

      else if (splitArrayRight[1][splitArrayRight[1].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Clubs" || splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Hearts" || splitArrayRight[1][splitArrayRight[1].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

        $("#" + id + "4").click(function () {

          $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '4 img').removeClass("cardPile")

          splitArrayRight[1].push(splitCard)

          $('#' + id + '4 img').addClass("noOffset")
          $("#" + id + "4").off("click");

        })
      }

      else if (splitArrayRight[2][splitArrayRight[2].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Clubs" || splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Hearts" || splitArrayRight[2][splitArrayRight[2].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

        $("#" + id + "6").click(function () {

          $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '6 img').removeClass("cardPile")

          splitArrayRight[2].push(splitCard)

          $('#' + id + '6 img').addClass("noOffset")
          $("#" + id + "6").off("click");


        })
      }

      else if (splitArrayRight[3][splitArrayRight[3].length - 1][0] - splitCard[0] == 1 && ((splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Clubs" || splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Spades") && (splitCard[2] == "Diamonds" || splitCard[2] == "Hearts") || (splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Hearts" || splitArrayRight[3][splitArrayRight[3].length - 1][2] == "Diamonds") && (splitCard[2] == "Clubs" || splitCard[2] == "Spades"))) {

        $("#" + id + "8").click(function () {

          $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '8 img').removeClass("cardPile")

          splitArrayRight[3].push(splitCard)

          $('#' + id + '8 img').addClass("noOffset")
          $("#" + id + "8").off("click");

        })
      }
      return splitArrayRight
    }

                  // ACE PILES PLAY 1ST CARD

    function playerTurnAcePile(playerTurn, id, pileType, aceArray, splitCard) {


      if (id == "acePile" && ($("#" + id + "1 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "1").click(function () {

          $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '1 img').removeClass("cardPile")


          aceArray[0].push(splitCard);



          $('#' + id + '1 img').addClass("offsetLeft")
          $("#" + id + "1").off("click");

          return aceArray

        });
      }



      else if (id == "acePile" && ($("#" + id + "2 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "2").click(function () {

          $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '2 img').removeClass("cardPile")

          aceArray[1].push(splitCard);




          $('#' + id + '2 img').addClass("offsetLeft")
          $("#" + id + "2").off("click");
          return aceArray

        });
      }

      else if (id == "acePile" && ($("#" + id + "3 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "3").click(function () {

          $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '3 img').removeClass("cardPile")

          aceArray[2].push(splitCard);


          $('#' + id + '3 img').addClass("offsetLeft")
          $("#" + id + "3").off("click");
          return aceArray

        });
      }


      else if (id == "acePile" && ($("#" + id + "4 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "4").click(function () {

          $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '4 img').removeClass("cardPile")

          aceArray[3].push(splitCard);


          $('#' + id + '4 img').addClass("offsetLeft")
          $("#" + id + "4").off("click");
          return aceArray

        });
      }


      else if (id == "acePile" && ($("#" + id + "5 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "5").click(function () {

          $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '5 img').removeClass("cardPile")

          aceArray[4].push(splitCard);


          $('#' + id + '5 img').addClass("offsetLeft")
          $("#" + id + "5").off("click");
          return aceArray

        });
      }

      else if (id == "acePile" && ($("#" + id + "6 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "6").click(function () {

          $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '6 img').removeClass("cardPile")

          aceArray[5].push(splitCard);


          $('#' + id + '6 img').addClass("offsetLeft")
          $("#" + id + "6").off("click");
          return aceArray

        });
    }

      else if (id == "acePile" && ($("#" + id + "7 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "7").click(function () {

          $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '7 img').removeClass("cardPile")

          aceArray[6].push(splitCard);


          $('#' + id + '7 img').addClass("offsetLeft")
          $("#" + id + "7").off("click");
          return aceArray

        });
      }


      else if (id == "acePile" && ($("#" + id + "8 img").length == 0) && splitCard[0] == 1) {

        $("#" + id + "8").click(function () {

          $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '8 img').removeClass("cardPile")

          aceArray[7].push(splitCard);

          $('#' + id + '8 img').addClass("offsetLeft")
          $("#" + id + "8").off("click");
          return aceArray

        })
    }

    }




    function playerBuildAcePile(playerTurn, id, pileType, aceArray, splitCard) {

      if (($("#" + id + "1 img").length > 0) && splitCard[0] - aceArray[0][aceArray[0].length - 1][0] == 1 && splitCard[2] == aceArray[0][aceArray[0].length - 1][2]) {
      console.log("hiiii");

        $("#" + id + "1").click(function () {

          $('#' + id + '1').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '1 img').removeClass("cardPile")


          aceArray[0].push(splitCard);
          console.log(aceArray);



          $('#' + id + '1 img').addClass("offsetLeft")
          $("#" + id + "1").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "2 img").length > 0) && splitCard[0] - aceArray[1][aceArray[1].length - 1][0] == 1 && splitCard[2] == aceArray[1][aceArray[1].length - 1][2]) {


        $("#" + id + "2").click(function () {

          $('#' + id + '2').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '2 img').removeClass("cardPile")


          aceArray[1].push(splitCard);
          console.log(aceArray);



          $('#' + id + '2 img').addClass("offsetLeft")
          $("#" + id + "2").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "3 img").length > 0) && splitCard[0] - aceArray[2][aceArray[2].length - 1][0] == 1 && splitCard[2] == aceArray[2][aceArray[2].length - 1][2]) {


        $("#" + id + "3").click(function () {

          $('#' + id + '3').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '3 img').removeClass("cardPile")


          aceArray[2].push(splitCard);
          console.log(aceArray);


          $('#' + id + '3 img').addClass("offsetLeft")
          $("#" + id + "3").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "4 img").length > 0) && splitCard[0] - aceArray[3][aceArray[3].length - 1][0] == 1 && splitCard[2] == aceArray[3][aceArray[3].length - 1][2]) {


        $("#" + id + "4").click(function () {

          $('#' + id + '4').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '4 img').removeClass("cardPile")


          aceArray[3].push(splitCard);
          console.log(aceArray);



          $('#' + id + '4 img').addClass("offsetLeft")
          $("#" + id + "4").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "5 img").length > 0) && splitCard[0] - aceArray[4][aceArray[4].length - 1][0] == 1 && splitCard[2] == aceArray[4][aceArray[4].length - 1][2]) {


        $("#" + id + "5").click(function () {

          $('#' + id + '5').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '5 img').removeClass("cardPile")


          aceArray[4].push(splitCard);
          console.log(aceArray);



          $('#' + id + '5 img').addClass("offsetLeft")
          $("#" + id + "5").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "6 img").length > 0) && splitCard[0] - aceArray[5][aceArray[5].length - 1][0] == 1 && splitCard[2] == aceArray[5][aceArray[5].length - 1][2]) {


        $("#" + id + "6").click(function () {

          $('#' + id + '6').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '6 img').removeClass("cardPile")


          aceArray[5].push(splitCard);
          console.log(aceArray);



          $('#' + id + '6 img').addClass("offsetLeft")
          $("#" + id + "6").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "7 img").length > 0) && splitCard[0] - aceArray[6][aceArray[6].length - 1][0] == 1 && splitCard[2] == aceArray[6][aceArray[6].length - 1][2]) {


        $("#" + id + "7").click(function () {

          $('#' + id + '7').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '7 img').removeClass("cardPile")


          aceArray[6].push(splitCard);
          console.log(aceArray);



          $('#' + id + '7 img').addClass("offsetLeft")
          $("#" + id + "7").off("click");
          return aceArray

        });
      }

      if (($("#" + id + "8 img").length > 0) && splitCard[0] - aceArray[7][aceArray[7].length - 1][0] == 1 && splitCard[2] == aceArray[7][aceArray[7].length - 1][2]) {


        $("#" + id + "8").click(function () {

          $('#' + id + '8').append( $('#player' + playerTurn + pileType + '>img:last-child') );
          $('#' + id + '8 img').removeClass("cardPile")


          aceArray[7].push(splitCard);
          console.log(aceArray);



          $('#' + id + '8 img').addClass("offsetLeft")
          $("#" + id + "8").off("click");
          return aceArray

        });
    }
    }







    $("#endTurn").click(function () {

      turn == "X" ? turn = "Y" : turn = "X";

    })




})
});
