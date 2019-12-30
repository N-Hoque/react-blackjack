"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Deck_1 = require("./card/data/Deck");
var DeckView_1 = require("./deck_view/DeckView");
var PlayerDeckView_1 = require("./deck_view/PlayerDeckView");
var Button_1 = require("./Button");
function Welcome(props) {
    return React.createElement("h1", null, "WELCOME TO BLACKJACK");
}
function Decks(props) {
    if (!props.hasGameStarted) {
        return React.createElement("div", { className: "Decks" });
    }
    else {
        return (React.createElement("div", { className: "Decks" },
            React.createElement(PlayerDeckView_1.PlayerDeckView, { name: "Player", playerDeck: props.playerDeck, drawPile: props.drawPile }),
            React.createElement(DeckView_1.DeckView, { name: "Draw Pile", deck: props.drawPile }),
            React.createElement(PlayerDeckView_1.PlayerDeckView, { name: "Dealer", playerDeck: props.dealerDeck, drawPile: props.drawPile })));
    }
}
function Actions(props) {
    if (props.hasGameEnded) {
        return (React.createElement("div", { className: "Actions" },
            React.createElement(Button_1.Button, { label: "Restart Game", action: props.startFunction })));
    }
    else {
        if (!props.hasGameStarted) {
            return (React.createElement("div", { className: "Actions" },
                React.createElement(Button_1.Button, { label: "Start Game", action: props.startFunction })));
        }
        else {
            return (React.createElement("div", { className: "Actions" },
                React.createElement(Button_1.Button, { label: "Hit", action: props.hitFunction }),
                React.createElement(Button_1.Button, { label: "Stand", action: props.standFunction })));
        }
    }
}
function EndGameMessage(props) {
    if (props.hasGameEnded) {
        return React.createElement("div", null, props.endGameMessage);
    }
    return React.createElement("div", null);
}
var Blackjack = /** @class */ (function (_super) {
    __extends(Blackjack, _super);
    function Blackjack(props) {
        var _this = _super.call(this, props) || this;
        _this.standPlayer = _this.standPlayer.bind(_this);
        _this.hitPlayer = _this.hitPlayer.bind(_this);
        _this.startGame = _this.startGame.bind(_this);
        _this.state = {
            deckState: {
                drawPile: new Deck_1.Deck(),
                dealerDeck: new Deck_1.Deck(),
                playerDeck: new Deck_1.Deck(),
            },
            hasGameStarted: false,
            hasGameEnded: false,
            gameEndMessage: "",
        };
        return _this;
    }
    Blackjack.prototype.initialiseDeck = function () {
        this.setState({
            deckState: {
                dealerDeck: new Deck_1.Deck(),
                drawPile: new Deck_1.Deck(),
                playerDeck: new Deck_1.Deck(),
            },
        });
        this.state.deckState.drawPile.createDeck();
        this.state.deckState.drawPile.shuffleDeck();
    };
    Blackjack.prototype.drawCardPlayer = function () {
        this.state.deckState.playerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    };
    Blackjack.prototype.drawCardDealer = function () {
        this.state.deckState.dealerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    };
    Blackjack.prototype.startGame = function () {
        this.setState({
            hasGameStarted: true,
            hasGameEnded: false,
            gameEndMessage: "",
        });
        this.initialiseDeck();
        // Draw 2 cards for player.
        this.drawCardPlayer();
        this.drawCardPlayer();
        // Draw 2 cards for dealer.
        this.drawCardDealer();
        this.drawCardDealer();
    };
    Blackjack.prototype.hitPlayer = function () {
        this.state.deckState.playerDeck.drawCardFromDeck(this.state.deckState.drawPile);
        var playerDeckValue = this.state.deckState.playerDeck.getDeckValue();
        if (playerDeckValue > 21) {
            this.setState({
                hasGameEnded: true,
                gameEndMessage: "Player has bust! Game Over.",
            });
        }
    };
    Blackjack.prototype.standPlayer = function () {
        this.letDealerPlay();
    };
    Blackjack.prototype.letDealerPlay = function () {
        while (this.state.deckState.dealerDeck.getDeckValue() < 17) {
            this.drawCardDealer();
        }
        var finalDealerValue = this.state.deckState.dealerDeck.getDeckValue();
        var finalPlayerValue = this.state.deckState.playerDeck.getDeckValue();
        var msg = finalDealerValue > 21 || finalDealerValue < finalPlayerValue
            ? "The player has won! Well done!"
            : "The dealer has won. Better luck next time.";
        this.setState({
            gameEndMessage: msg,
            hasGameEnded: true,
            hasGameStarted: false,
        });
    };
    Blackjack.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Welcome, null),
            React.createElement(Decks, { drawPile: this.state.deckState.drawPile, playerDeck: this.state.deckState.playerDeck, dealerDeck: this.state.deckState.dealerDeck, hasGameStarted: this.state.hasGameStarted }),
            React.createElement(Actions, { hasGameStarted: this.state.hasGameStarted, hasGameEnded: this.state.hasGameEnded, startFunction: this.startGame, hitFunction: this.hitPlayer, standFunction: this.standPlayer }),
            React.createElement(EndGameMessage, { hasGameEnded: this.state.hasGameEnded, endGameMessage: this.state.gameEndMessage })));
    };
    return Blackjack;
}(React.Component));
exports.Blackjack = Blackjack;
