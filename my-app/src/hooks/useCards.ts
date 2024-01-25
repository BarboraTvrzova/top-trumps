import { useCallback, useEffect, useState } from "react";
import type { Card, Selectable } from "../components/Cards";

export type Winner = "computer" | "player";
type winner = "tie" | "computer" | "player" | undefined;

const useCards = (data: Card[]) => {
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  const [message, setMessage] = useState<string>("");
  const [playerWonRound, setPlayerWonRound] = useState<winner>("player");
  const [cardsPlayer, setCardsPlayer] = useState<Card[]>([]);
  const [cardsComputer, setCardsComputer] = useState<Card[]>([]);

  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [selectedStat, setSelectedStat] = useState<Selectable | undefined>(
    undefined
  );

  const [winner, setWinner] = useState<Winner>();

  // assign random id to each card and sort based on id value
  const shuffle = useCallback(() => {
    const dataWithId = data
      .map((card) => {
        return { ...card, id: Math.random() * data.length };
      })
      .sort((a, b) => a.id - b.id);
    setCardsPlayer(dataWithId.slice(0, dataWithId.length / 2));
    setCardsComputer(dataWithId.slice(data.length / 2, data.length));
  }, [data]);

  //   pick random stat
  const pickRandom = (): Selectable => {
    const random = Math.floor(Math.random() * 3 + 1);
    if (random === 0) {
      return "attempt_tries";
    } else if (random === 1) {
      return "record";
    } else {
      return "times_broken";
    }
  };

  //   select stats to play and compare
  const handlePickStat = ({
    value,
    selected,
  }: {
    value: number;
    selected: Selectable;
  }) => {
    setRound((prev) => prev + 1);

    if (cardsComputer[0][selected] < value) {
      setScore(score + 1);
      setMessage(
        `Nice! Your value was ${value} and the other player has ${cardsComputer[0][selected]}. You win this round!`
      );
      setPlayerWonRound("player");
    } else if (cardsComputer[0][selected] === value) {
      setMessage("It is a tie!");
      setPlayerWonRound("tie");
    } else {
      setMessage(
        `Too bad - your value was ${value} but the other player has ${cardsComputer[0][selected]}. Better luck next round!`
      );
      setPlayerWonRound("computer");
    }

    // removes card from decks
    setCardsComputer((prev) => {
      if (prev.length > 1) {
        const newArr = [...prev].slice(1, prev.length);
        return newArr;
      } else {
        setPlayerWonRound(undefined);
        return [];
      }
    });
    setCardsPlayer((prev) => {
      if (prev.length > 1) {
        const newArr = [...prev].slice(1, prev.length);
        return newArr;
      } else {
        setPlayerWonRound(undefined);
        return [];
      }
    });

    // ads selected cards to the middle
    setSelectedStat(selected);
    setSelectedCards([cardsPlayer[0], cardsComputer[0]]);
  };

  //   continue to next round
  const handleNext = () => {
    if (playerWonRound === "player") {
      setCardsPlayer((prev) => {
        const newArr = [...prev, ...selectedCards];
        return newArr;
      });
    } else if (playerWonRound === "tie") {
      setCardsPlayer((prev) => {
        const newArr = [...prev, selectedCards[0]];
        return newArr;
      });
      setCardsComputer((prev) => {
        const newArr = [...prev, selectedCards[1]];
        return newArr;
      });
    } else {
      setCardsComputer((prev) => {
        const newArr = [...prev, ...selectedCards];
        return newArr;
      });
    }
    setSelectedCards([]);
    setMessage("");

    // if computer won last round, it will automatically select next card
    if (playerWonRound === "computer") {
      const random = pickRandom();
      setTimeout(() => {
        handlePickStat({
          selected: random,
          value: cardsPlayer[0][random],
        });
      }, 1500);
    }
  };

  // shuffle cards on initial load
  useEffect(() => {
    shuffle();
  }, [shuffle]);

  //   decide winer when no cards are left on one side
  useEffect(() => {
    if (cardsPlayer.length === 0 && !playerWonRound && round !== 1) {
      setWinner("computer");
    }
    if (cardsComputer.length === 0 && playerWonRound && round !== 1) {
      setWinner("player");
    }
  }, [cardsPlayer.length, cardsComputer.length, playerWonRound, round]);

  return {
    cardsPlayer,
    cardsComputer,
    handlePickStat,
    handleNext,
    message,
    round,
    score,
    selectedCards,
    selectedStat,
    winner,
    playerWonRound,
  };
};

export default useCards;
