const _isFaceCard = Symbol('isFaceCard');
const _count = Symbol('count');
const _wins = Symbol('wins');
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this[_isFaceCard] = this.rank > 10 ? true : this.rank === 1;
    }

    get isFaceCard() {
        return this[_isFaceCard];
    }

    toString() {
        if (this.rank === 1) {
            console.log(`Ace of ${this.suit}`);
        } else if (this.rank === 11) {
            console.log(`Jack of ${this.suit}`);
        } else if (this.rank === 12) {
            console.log(`Queen of ${this.suit}`);
        } else if (this.rank === 13) {
            console.log(`King of ${this.suit}`);
        } else {
            console.log(`${this.rank} of ${this.suit}`);
        }
    }

    static Compare(cardOne, cardTwo) {
        if (cardOne.rank === 1 && cardTwo.rank !== 1) {
            return 'true'
        } else if (cardOne.rank !== 1 && cardTwo.rank === 1) {
            return 'false'
        } else if (cardOne.rank === cardTwo.rank) {
            return 'equal'
        } else if (cardOne.rank > cardTwo.rank) {
            return 'true'
        } else if (cardOne.rank < cardTwo.rank) {
            return 'false'
        }
    }
}

class Deck {
    constructor() {
        this.cards = (function () {
            let arr = [];
            suits.forEach(el => {
                for (let i = 1; i < 14; i++) {
                    arr.push(new Card(el, i))
                }
            });
            return arr;
        })();
        this[_count] = this.cards.length;
    }

    get count() {
        return this[_count];
    }

    shuffle() {
        let randomCardA, randomCardB, tempX;

        for (let i = 0; i < this.cards.length; i++) {
            randomCardA = Math.floor(Math.random() * this.cards.length);
            randomCardB = Math.floor(Math.random() * this.cards.length);
            tempX = this.cards[randomCardA];
            this.cards[randomCardA] = this.cards[randomCardB];
            this.cards[randomCardB] = tempX;
        }
    }

    draw(n = 1) {
        let res = this.cards.splice(-n);
        this[_count] = this.cards.length;
        return res;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this[_wins] = 0;
        this.deck = new Deck();
    }

    get wins() {
        return this[_wins];
    }

    static Play(playerOne, playerTwo) {
        if (playerOne.deck.count === 52 && playerOne.deck.count === 52) {

            playerOne.deck.shuffle();
            playerTwo.deck.shuffle();

            while (playerOne.deck.count > 0 && playerTwo.deck.count > 0) {
                const playerOneCard = playerOne.deck.draw();
                const playerTwoCard = playerTwo.deck.draw();

                playerOne.deck.draw(2);
                playerTwo.deck.draw(2);


                if (Card.Compare(...playerOneCard, ...playerTwoCard) === 'true') {
                    playerOne[_wins]++
                } else if (Card.Compare(...playerOneCard, ...playerTwoCard) === 'false') {
                    playerTwo[_wins]++
                }

                if (playerOne.deck.count === 0 && playerTwo.deck.count === 0) {
                    let winner = playerOne[_wins] > playerTwo[_wins] ? `${playerOne.name} wins ${playerOne[_wins]} to ${playerTwo[_wins]}` :
                        playerOne[_wins] < playerTwo[_wins] ? `${playerTwo.name} wins ${playerTwo[_wins]} to ${playerOne[_wins]}` :
                            `DRAW`;
                    console.log(winner);
                }
            }
        } else {
            playerOne[_wins] = 0;
            playerTwo[_wins] = 0;
            playerOne.deck = new Deck();
            playerTwo.deck = new Deck();
            Player.Play(playerOne, playerTwo);
        }
    }
}
