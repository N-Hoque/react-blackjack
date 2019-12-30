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
require("./CardView.css");
var Card_1 = require("./data/Card");
var CardView = /** @class */ (function (_super) {
    __extends(CardView, _super);
    function CardView(props) {
        var _this = _super.call(this, props) || this;
        _this._card = new Card_1.Card(props.rank, props.suit);
        return _this;
    }
    CardView.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "CardView" },
            react_1.default.createElement("h1", null, this.props.deckName),
            react_1.default.createElement("h1", { className: "Rank" }, this._card.rank),
            react_1.default.createElement("h1", { className: this._card.suit.valueOf() % 2 === 0 ? "SuitBlack" : "SuitRed" }, this._card.suitName)));
    };
    return CardView;
}(react_1.default.Component));
exports.CardView = CardView;
