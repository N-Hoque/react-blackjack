import React from "react";

import "./CardView.css";

type Rank =
  "ACE"
  | "TWO"
  | "THREE"
  | "FOUR"
  | "FIVE"
  | "SIX"
  | "SEVEN"
  | "EIGHT"
  | "NINE"
  | "TEN"
  | "JACK"
  | "QUEEN"
  | "KING";

type Suit = "HEARTS" | "DIAMONDS" | "CLUBS" | "SPADES";

interface CardProps {
  rank: Rank;
  suit: Suit;
}

export class CardView extends React.Component<CardProps> {
  private readonly rank: Rank;
  private readonly suit: Suit;

  constructor(props: CardProps) {
    super(props);
    this.rank = this.props.rank;
    this.suit = this.props.suit;
  }

  private getCardColor(): string {
    return this.suit === "HEARTS" || this.suit === "CLUBS" ? "SuitRed" : "SuitBlack";
  }

  render() {
    return (
      <div className="CardView">
        <h1>{this.rank}</h1>
        <h1>of</h1>
        <h1 className={this.getCardColor()}>{this.suit}</h1>
      </div>
    );
  }
}
