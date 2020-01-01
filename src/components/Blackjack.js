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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Deck_1 = require("./card/data/Deck");
var DeckView_1 = require("./deck_view/DeckView");
var PlayerDeckView_1 = require("./deck_view/PlayerDeckView");
var Button_1 = require("./Button");
function Welcome(props) {
    return react_1.default.createElement("h1", null, "WELCOME TO BLACKJACK");
}
function Decks(props) {
    if (!props.hasGameStarted) {
        return react_1.default.createElement("div", { className: "Decks" });
    }
    else {
        return (react_1.default.createElement("div", { className: "Decks" },
            react_1.default.createElement(PlayerDeckView_1.PlayerDeckView, { name: "Player", playerDeck: props.playerDeck, drawPile: props.drawPile }),
            react_1.default.createElement(DeckView_1.DeckView, { name: "Draw Pile", deck: props.drawPile }),
            react_1.default.createElement(PlayerDeckView_1.PlayerDeckView, { name: "Dealer", playerDeck: props.dealerDeck, drawPile: props.drawPile })));
    }
}
function Actions(props) {
    if (props.hasGameEnded) {
        return (react_1.default.createElement("div", { className: "Actions" },
            react_1.default.createElement(Button_1.Button, { label: "Restart Game", action: props.startFunction })));
    }
    else {
        if (!props.hasGameStarted) {
            return (react_1.default.createElement("div", { className: "Actions" },
                react_1.default.createElement(Button_1.Button, { label: "Start Game", action: props.startFunction })));
        }
        else {
            return (react_1.default.createElement("div", { className: "Actions" },
                react_1.default.createElement(Button_1.Button, { label: "Hit", action: props.hitFunction }),
                react_1.default.createElement(Button_1.Button, { label: "Stand", action: props.standFunction })));
        }
    }
}
function EndGameMessage(props) {
    if (props.hasGameEnded) {
        return react_1.default.createElement("div", null, props.endGameMessage);
    }
    return react_1.default.createElement("div", null);
}
var Blackjack = /** @class */ (function (_super) {
    __extends(Blackjack, _super);
    function Blackjack(props) {
        var _this = _super.call(this, props) || this;
        _this.startGame = _this.startGame.bind(_this);
        _this.standPlayer = _this.standPlayer.bind(_this);
        _this.hitPlayer = _this.hitPlayer.bind(_this);
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
        console.log("INITIALISING DECKS.");
        this.setState({
            deckState: {
                drawPile: new Deck_1.Deck(true),
                dealerDeck: new Deck_1.Deck(),
                playerDeck: new Deck_1.Deck(),
            },
        });
        console.log("DECKS CREATED!");
    };
    Blackjack.prototype.drawCardPlayer = function () {
        this.state.deckState.playerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    };
    Blackjack.prototype.drawCardDealer = function () {
        this.state.deckState.dealerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    };
    Blackjack.prototype.startGame = function () {
        console.log("STARTING GAME.");
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
        console.log("STARTING GAME.");
    };
    Blackjack.prototype.hitPlayer = function () {
        this.drawCardPlayer();
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
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Welcome, null),
            react_1.default.createElement(Decks, { drawPile: this.state.deckState.drawPile, playerDeck: this.state.deckState.playerDeck, dealerDeck: this.state.deckState.dealerDeck, hasGameStarted: this.state.hasGameStarted }),
            react_1.default.createElement(Actions, { hasGameStarted: this.state.hasGameStarted, hasGameEnded: this.state.hasGameEnded, startFunction: this.startGame, hitFunction: this.hitPlayer, standFunction: this.standPlayer }),
            react_1.default.createElement(EndGameMessage, { hasGameEnded: this.state.hasGameEnded, endGameMessage: this.state.gameEndMessage })));
    };
    return Blackjack;
}(react_1.default.Component));
exports.Blackjack = Blackjack;
