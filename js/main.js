$(function () {

console.log("hello");

class Deck {
  constructor() {
    this.deck = [];

    var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    var values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (var suit in suits) {
      for (var value in values) {
        this.deck.push(`${values[value]} of ${suits[suit]}`);
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



$("#startGame").click(function(){
  console.log("start game");
  const deck1 = new Deck();
  deck1.shuffle();
  deck1.createStartMove()
  console.log(deck1.createTalon());
  console.log(deck1.deck);
  // console.log(deck1.createTalon());
  const deck2 = new Deck();
  deck2.shuffle();
  deck2.createStartMove()
  console.log(deck2.createTalon());
  console.log(deck2.deck);
  // console.log(deck2.createTalon());

})
});
