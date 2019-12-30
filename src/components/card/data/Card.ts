import { Rank } from "./Rank";
import { Suit } from "./Suit";

export class Card {
  private _rank: Rank;
  private _suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this._rank = rank;
    this._suit = suit;
  }

  get rank(): Rank {
    return this._rank;
  }

  get suit(): Suit {
    return this._suit;
  }

  get suitName(): string {
    return Suit[this._suit];
  }

  get value(): number {
    return this._rank.valueOf();
  }

  public toString(): string {
    return `${this._rank} of ${this._suit}`;
  }
}
