import React from "react";

import { Deck } from "../card/data/Deck";
import { CardView } from "../card/CardView";

type DeckProps = {
  name: string;
  deck: Deck;
};

export class DeckView extends React.Component<DeckProps> {
  private _deck: Deck;

  constructor(props: DeckProps) {
    super(props);

    this._deck = this.props.deck;
  }

  render() {
    const topCard = this._deck.getCard(this._deck.size - 1);

    if (topCard == null || topCard == undefined) {
      return (
        <div className="DeckView">
          <h1>THE DECK IS EMPTY.</h1>
        </div>
      );
    }
    return (
      <div className="DeckView">
        <CardView rank={topCard.rank} suit={topCard.suit} deckName={this.props.name} />
      </div>
    );
  }
}
