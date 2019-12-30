"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suit_1 = require("./Suit");
var Card = /** @class */ (function () {
    function Card(rank, suit) {
        this._rank = rank;
        this._suit = suit;
    }
    Object.defineProperty(Card.prototype, "rank", {
        get: function () {
            return this._rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suit", {
        get: function () {
            return this._suit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suitName", {
        get: function () {
            return Suit_1.Suit[this._suit];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "value", {
        get: function () {
            return this._rank.valueOf();
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.toString = function () {
        return this._rank + " of " + this._suit;
    };
    return Card;
}());
exports.Card = Card;
