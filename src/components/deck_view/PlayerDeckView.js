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
var CardView_1 = require("../card/CardView");
var PlayerDeckView = /** @class */ (function (_super) {
    __extends(PlayerDeckView, _super);
    function PlayerDeckView(props) {
        var _this = _super.call(this, props) || this;
        _this._playerDeck = _this.props.playerDeck;
        return _this;
    }
    PlayerDeckView.prototype.addToDeck = function (newCard) {
        this._playerDeck.addCard(newCard);
    };
    PlayerDeckView.prototype.render = function () {
        var _this = this;
        var cardViews = this._playerDeck
            .getDeckAsCardArray()
            .map(function (card) { return react_1.default.createElement(CardView_1.CardView, { rank: card.rank, suit: card.suit, deckName: _this.props.name }); });
        return react_1.default.createElement("div", { className: "PlayerDeckView" }, cardViews);
    };
    return PlayerDeckView;
}(react_1.default.Component));
exports.PlayerDeckView = PlayerDeckView;
