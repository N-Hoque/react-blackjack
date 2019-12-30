import { Deck } from "../components/card/data/Deck";

export class BlackjackGame {
  public static play(): void {
    while (true) {
      console.log("Welcome to Blackjack!");

      let playingDeck = new Deck();
      playingDeck.createDeck();
      playingDeck.shuffleDeck();

      let playerDeck = new Deck();
      let dealerDeck = new Deck();

      console.log("Dealing two cards to player.");
      playerDeck.drawCardFromDeck(playingDeck);
      playerDeck.drawCardFromDeck(playingDeck);

      console.log("Dealing two cards to dealer.");
      dealerDeck.drawCardFromDeck(playingDeck);
      dealerDeck.drawCardFromDeck(playingDeck);

      let isGameOver = false;

      // Handle player selection.
      while (true) {
        console.log(`Player's Deck: `);
        playerDeck.printDeck();

        let response = prompt("Press (1) to Hit, or (2) to Stand.");
        if (response == null) {
          console.error("INPUT WAS EMPTY. Returning to selection.");
          continue;
        }
        let parsedResponse = Number.parseInt(response);
        if (parsedResponse == 1) {
          playerDeck.drawCardFromDeck(playingDeck);
          console.log(`Deck value = ${playerDeck.getDeckValue()}`);
          if (playerDeck.getDeckValue() > 21) {
            console.log("BUST. GAME OVER.");
            isGameOver = true;
          }
        } else if (parsedResponse == 2) {
          console.log(`You have stood.`);
          break;
        } else {
          console.warn("Incorrect response. Returning to selection.");
          continue;
        }
      }

      // Handle dealer selection
      while (!isGameOver) {
        console.log(`Dealer deck: ${dealerDeck.getCard(0).toString()} + [HIDDEN]`);

        console.log("Dealer is drawing...");
        while (dealerDeck.getDeckValue() < 17) {
          dealerDeck.drawCardFromDeck(playingDeck);
        }
        console.log("Dealer deck: ");
        dealerDeck.printDeck();

        const finalDealerValue = dealerDeck.getDeckValue();
        const finalPlayerValue = playerDeck.getDeckValue();

        if (finalDealerValue > 21) {
          console.log("Dealer has BUST. YOU WIN!");
        } else if (finalDealerValue < finalPlayerValue) {
          console.log(`You beat the dealer ${finalPlayerValue} to ${finalDealerValue}. YOU WIN!`);
        } else {
          console.log(`The dealer has beaten you ${finalDealerValue} to ${finalPlayerValue}. YOU LOSE.`);
        }
        break;
      }
      while (isGameOver) {
        console.log("Would you like to play again?");
        let response = prompt("Press P to Play Again. Press (Q) to Quit");
        if (response == null) {
          console.error("INPUT IS EMPTY. Returning to selection.");
          continue;
        } else if (response.toLowerCase() == "q") {
          console.log("Quitting game...");
          break;
        } else if (response.toLowerCase() == "p") {
          isGameOver = false;
        }
      }

      if (isGameOver) {
        console.log("Thank you for playing!");
        break;
      } else {
        console.log("Resetting game...");
      }
    }
  }
}
