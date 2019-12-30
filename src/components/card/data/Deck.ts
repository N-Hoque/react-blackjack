import { Card } from "./Card";
import { suitArray } from "./Suit";
import { rankArray, Rank } from "./Rank";

export class Deck {
  private _cards: Card[];

  constructor() {
    this._cards = [];
  }

  get size(): number {
    return this._cards.length;
  }

  public createDeck(): void {
    for (let suit of suitArray) {
      for (let rank of rankArray) {
        this._cards.push(new Card(rank, suit));
      }
    }
  }

  public shuffleDeck(): void {
    for (let i = this.size - 1; i > 0; i--) {
      const randIndex = Math.floor(i * Math.random());
      const temp = this._cards[i];
      this._cards[i] = this._cards[randIndex];
      this._cards[randIndex] = temp;
    }
  }

  private checkIndex(cardIndex: number) {
    if (cardIndex < 0 || cardIndex >= this.size) {
      throw new Error(`ERROR: Cannot remove card with invalid index of ${cardIndex}`);
    }
  }

  public addCard(newCard: Card): void {
    this._cards.push(newCard);
  }

  public removeCard(cardIndex: number): void {
    this.checkIndex(cardIndex);
    this._cards.splice(cardIndex, 1);
  }

  public getCard(cardIndex: number): Card {
    this.checkIndex(cardIndex);
    return this._cards[cardIndex];
  }

  public getDeckAsCardArray(): Card[] {
    return this._cards;
  }

  public drawCardFromDeck(deckToDealFrom: Deck): void {
    this.addCard(deckToDealFrom.getCard(0));
    deckToDealFrom.removeCard(0);
  }

  public moveCardsToDeck(deckToMoveTo: Deck): void {
    for (let card of this._cards) {
      deckToMoveTo.addCard(card);
    }
    this._cards.splice(0, this.size);
  }

  public getDeckValue(): number {
    let totalValue = 0;

    for (let card of this._cards) {
      if (card.rank !== Rank.ACE) {
        totalValue += Math.min(card.value, 10); // Card values max out at 10 in Blackjack.
      } else if (totalValue <= 10) {
        // Aces are worth 1 or 11 depending on what the current totalValue is.
        totalValue += 11;
      } else {
        totalValue += 1;
      }
    }

    return totalValue;
  }

  public printDeck(): void {
    for (let card of this._cards) {
      console.log(card.toString());
    }
  }
}
