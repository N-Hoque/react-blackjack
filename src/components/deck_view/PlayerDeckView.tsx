import React from "react";
import { Card } from "../card/data/Card";
import { Deck } from "../card/data/Deck";
import { CardView } from "../card/CardView";

type PlayerProps = {
  name: string;
  playerDeck: Deck;
  drawPile: Deck;
};

export class PlayerDeckView extends React.Component<PlayerProps> {
  private _playerDeck: Deck;
  private _drawingDeck: Deck;

  constructor(props: PlayerProps) {
    super(props);

    this._playerDeck = this.props.playerDeck;
    this._drawingDeck = this.props.drawPile;
  }

  public addToDeck(newCard: Card) {
    this._playerDeck.addCard(newCard);
  }

  render() {
    const cardViews = [];

    for (let i = 0; i < this._playerDeck.size; i++) {
      const card = this._playerDeck.getCard(i);
      cardViews.push(<CardView rank={card.rank} suit={card.suit} deckName={this.props.name} />);
    }

    return <div className="PlayerDeckView">{cardViews}</div>;
  }
}
