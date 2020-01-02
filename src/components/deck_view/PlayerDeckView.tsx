import React from "react";
import { Card } from "../card/data/Card";
import { Deck } from "../card/data/Deck";
import { CardView } from "../card/CardView";

type PlayerProps = {
  name: string;
  playerDeck: Deck;
};

export class PlayerDeckView extends React.Component<PlayerProps> {
  private _playerDeck: Deck;

  constructor(props: PlayerProps) {
    super(props);

    this._playerDeck = this.props.playerDeck;
  }

  public addToDeck(newCard: Card) {
    this._playerDeck.addCard(newCard);
  }

  render() {
    const cardViews = this._playerDeck
      .getDeckAsCardArray()
      .map((card) => <CardView rank={card.rank} suit={card.suit} deckName={this.props.name} />);
    return <div className="PlayerDeckView">{cardViews}</div>;
  }
}
