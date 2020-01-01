"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("./Card");
var Suit_1 = require("./Suit");
var Rank_1 = require("./Rank");
var Deck = /** @class */ (function () {
    function Deck(isDeckMade) {
        this._cards = [];
        if (isDeckMade) {
            this.createDeck();
            this.shuffleDeck();
        }
    }
    Object.defineProperty(Deck.prototype, "size", {
        get: function () {
            return this._cards.length;
        },
        enumerable: true,
        configurable: true
    });
    Deck.prototype.createDeck = function () {
        for (var _i = 0, suitArray_1 = Suit_1.suitArray; _i < suitArray_1.length; _i++) {
            var suit = suitArray_1[_i];
            for (var _a = 0, rankArray_1 = Rank_1.rankArray; _a < rankArray_1.length; _a++) {
                var rank = rankArray_1[_a];
                this._cards.push(new Card_1.Card(rank, suit));
            }
        }
    };
    Deck.prototype.shuffleDeck = function () {
        for (var i = this.size - 1; i > 0; i--) {
            var randIndex = Math.floor(i * Math.random());
            var temp = this._cards[i];
            this._cards[i] = this._cards[randIndex];
            this._cards[randIndex] = temp;
        }
    };
    Deck.prototype.addCard = function (newCard) {
        this._cards.push(newCard);
    };
    Deck.prototype.removeCard = function (cardIndex) {
        this._cards.splice(cardIndex, 1);
    };
    Deck.prototype.getCard = function (cardIndex) {
        return this._cards[cardIndex];
    };
    Deck.prototype.getDeckAsCardArray = function () {
        return this._cards;
    };
    Deck.prototype.drawCardFromDeck = function (deckToDealFrom) {
        this.addCard(deckToDealFrom.getCard(0));
        deckToDealFrom.removeCard(0);
    };
    Deck.prototype.moveCardsToDeck = function (deckToMoveTo) {
        for (var _i = 0, _a = this._cards; _i < _a.length; _i++) {
            var card = _a[_i];
            deckToMoveTo.addCard(card);
        }
        this._cards.splice(0, this.size);
    };
    Deck.prototype.getDeckValue = function () {
        var totalValue = 0;
        for (var _i = 0, _a = this._cards; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.rank !== Rank_1.Rank.ACE) {
                totalValue += Math.min(card.value, 10); // Card values max out at 10 in Blackjack.
            }
            else if (totalValue <= 10) {
                // Aces are worth 1 or 11 depending on what the current totalValue is.
                totalValue += 11;
            }
            else {
                totalValue += 1;
            }
        }
        return totalValue;
    };
    Deck.prototype.printDeck = function () {
        for (var _i = 0, _a = this._cards; _i < _a.length; _i++) {
            var card = _a[_i];
            console.log(card.toString());
        }
    };
    return Deck;
}());
exports.Deck = Deck;
