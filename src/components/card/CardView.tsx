import React from "react";

import "./CardView.css";

import { Card } from "./data/Card";
import { Rank } from "./data/Rank";
import { Suit } from "./data/Suit";

type CardProps = {
  rank: Rank;
  suit: Suit;
  deckName: string;
};

export class CardView extends React.Component<CardProps> {
  private _card: Card;

  constructor(props: CardProps) {
    super(props);
    this._card = new Card(props.rank, props.suit);
  }

  render() {
    return (
      <div className="CardView">
        <h1>{this.props.deckName}</h1>
        <h1 className="Rank">{this._card.rank}</h1>
        <h1 className={this._card.suit.valueOf() % 2 === 0 ? "SuitBlack" : "SuitRed"}>{this._card.suitName}</h1>
      </div>
    );
  }
}
