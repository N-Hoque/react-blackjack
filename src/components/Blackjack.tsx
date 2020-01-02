import React from "react";

import { Card } from "./card/data/Card";
import { Deck } from "./card/data/Deck";
import { DeckView } from "./deck_view/DeckView";
import { PlayerDeckView } from "./deck_view/PlayerDeckView";
import { Button } from "./Button";

type BJDeckState = {
  drawPile: Deck;
  dealerDeck: Deck;
  playerDeck: Deck;
};

type BJState = {
  deckState: BJDeckState;
  hasGameStarted: boolean;
  hasGameEnded: boolean;
  gameEndMessage: string;
};

type PropsEndGame = {
  hasGameEnded: boolean;
  endGameMessage: string;
};

type PropsActions = {
  hasGameStarted: boolean;
  hasGameEnded: boolean;
  startFunction: () => void;
  hitFunction: () => void;
  standFunction: () => void;
};

function Welcome(props: object): JSX.Element {
  return <h1>WELCOME TO BLACKJACK</h1>;
}

function Decks(props: BJDeckState & { hasGameStarted: boolean }): JSX.Element {
  if (!props.hasGameStarted) {
    return <div className="Decks"></div>;
  }
  return (
    <div className="Decks">
      <PlayerDeckView name="Player" playerDeck={props.playerDeck} />
      <DeckView name="Draw Pile" deck={props.drawPile} />
      <PlayerDeckView name="Dealer" playerDeck={props.dealerDeck} />
    </div>
  );
}

function Actions(props: PropsActions): JSX.Element {
  if (props.hasGameEnded) {
    return (
      <div className="Actions">
        <Button label="Restart Game" action={props.startFunction} />
      </div>
    );
  } else {
    if (!props.hasGameStarted) {
      return (
        <div className="Actions">
          <Button label="Start Game" action={props.startFunction} />
        </div>
      );
    } else {
      return (
        <div className="Actions">
          <Button label="Hit" action={props.hitFunction} />
          <Button label="Stand" action={props.standFunction} />
        </div>
      );
    }
  }
}

function EndGameMessage(props: PropsEndGame): JSX.Element {
  if (props.hasGameEnded) {
    return <div>{props.endGameMessage}</div>;
  }
  return <div></div>;
}

export class Blackjack extends React.Component<{}, BJState> {
  constructor(props: {}) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.standPlayer = this.standPlayer.bind(this);
    this.hitPlayer = this.hitPlayer.bind(this);

    this.state = {
      deckState: {
        drawPile: new Deck(),
        dealerDeck: new Deck(),
        playerDeck: new Deck(),
      },
      hasGameStarted: false,
      hasGameEnded: false,
      gameEndMessage: "",
    };
  }

  private drawCardPlayer(): void {
    this.state.deckState.playerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    this.setState({ deckState: this.state.deckState });
  }

  private drawCardDealer(): void {
    this.state.deckState.dealerDeck.drawCardFromDeck(this.state.deckState.drawPile);
    this.setState({ deckState: this.state.deckState });
  }

  public startGame(): void {
    console.log("STARTING GAME.");

    this.setState({
      hasGameStarted: true,
      hasGameEnded: false,
      gameEndMessage: "",
      deckState: {
        drawPile: new Deck(true),
        dealerDeck: new Deck(),
        playerDeck: new Deck(),
      },
    });

    // Draw 2 cards for player.
    this.drawCardPlayer();
    this.drawCardPlayer();

    // Draw 2 cards for dealer.
    this.drawCardDealer();
    this.drawCardDealer();

    console.log("STARTING GAME.");
  }

  public hitPlayer(): void {
    console.log("HIT");

    this.drawCardPlayer();

    const playerDeckValue = this.state.deckState.playerDeck.getDeckValue();

    if (playerDeckValue > 21) {
      this.setState({
        hasGameStarted: false,
        hasGameEnded: true,
        gameEndMessage: "Player has bust! Game Over.",
      });
    }
  }

  public standPlayer(): void {
    this.letDealerPlay();
  }

  private letDealerPlay(): void {
    while (this.state.deckState.dealerDeck.getDeckValue() < 17) {
      this.drawCardDealer();
    }

    const finalDealerValue: number = this.state.deckState.dealerDeck.getDeckValue();
    const finalPlayerValue: number = this.state.deckState.playerDeck.getDeckValue();

    const msg =
      finalDealerValue > 21 || finalDealerValue < finalPlayerValue
        ? "The player has won! Well done!"
        : "The dealer has won. Better luck next time.";

    this.setState({
      gameEndMessage: msg,
      hasGameEnded: true,
      hasGameStarted: false,
    });
  }

  render() {
    return (
      <div>
        <Welcome />
        <Decks
          drawPile={this.state.deckState.drawPile}
          playerDeck={this.state.deckState.playerDeck}
          dealerDeck={this.state.deckState.dealerDeck}
          hasGameStarted={this.state.hasGameStarted}
        />
        <Actions
          hasGameStarted={this.state.hasGameStarted}
          hasGameEnded={this.state.hasGameEnded}
          startFunction={this.startGame}
          hitFunction={this.hitPlayer}
          standFunction={this.standPlayer}
        />
        <EndGameMessage hasGameEnded={this.state.hasGameEnded} endGameMessage={this.state.gameEndMessage} />
      </div>
    );
  }
}
