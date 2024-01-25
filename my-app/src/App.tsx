import Cards from "./components/Cards";
import data from "./world_records_sample.json";
import useCards from "./hooks/useCards";
import Modal from "./components/Modal";

function App() {
  const {
    cardsComputer,
    cardsPlayer,
    handlePickStat,
    handleNext,
    message,
    round,
    score,
    selectedCards,
    selectedStat,
    winner,
    playerWonRound,
  } = useCards(data);

  return (
    <>
      {winner ? (
        <Modal winner={winner} />
      ) : (
        <div className="p-4 w-full h-full grid grid-rows-[1fr_2fr_1fr] max-w-[80rem] mx-auto">
          <div className="flex flex-col">
            <h2 className="pb-4">
              Score: {score}, Round: {round}
            </h2>

            <p className="m-auto text-center max-w-[35rem] text-xs">
              Pick a stat on your card to play and wait to see who wins the
              round! If you win, you can pick again - and if you lose, it is the
              computers turn. Press the continue button to progress to next
              rounds. Player that collects all the cards wins!
            </p>
          </div>
          <div className="p-4 flex justify-center gap-4 lg:justify-between items-center h-full my-auto flex-wrap">
            <div
              className={`w-full md:w-[unset]  ${
                selectedCards.length ? "hidden md:block" : ""
              }`}
            >
              <h2 className="text-center mb-2">
                Player Cards
                <span className="text-[0.5rem] opacity-80 ml-1">
                  ({cardsPlayer.length})
                </span>
              </h2>
              <Cards
                data={cardsPlayer}
                onClick={handlePickStat}
                isHidden={
                  Boolean(selectedCards.length) || playerWonRound === "computer"
                }
              />
            </div>
            {selectedCards.length ? (
              <div className="h-fit w-full md:w-[unset] order-3 lg:order-2">
                <h2 className="text-center mb-2">Played Cards</h2>
                <div className="flex gap-4 w-full flex-wrap">
                  {selectedCards[0] ? (
                    <Cards data={[selectedCards[0]]} selected={selectedStat} />
                  ) : null}
                  {selectedCards[1] ? (
                    <Cards data={[selectedCards[1]]} selected={selectedStat} />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div
              className={`order-1 w-full md:w-[unset] lg:order-3 ${
                selectedCards.length ? "hidden md:block" : ""
              } `}
            >
              <h2 className="text-center mb-2">
                Computer Cards
                <span className="text-[0.5rem] opacity-80 ml-1">
                  ({cardsComputer.length})
                </span>
              </h2>
              <Cards data={cardsComputer} isHidden />
            </div>
          </div>
          <div className="flex flex-col items-center py-4">
            <p className="text-center mb-4 text-xl">{message}</p>
            <button
              className="px-14 py-3 bg-rose-800 rounded-md leading-[1] inline-flex items-center justify-center disabled:opacity-30"
              onClick={handleNext}
              disabled={selectedCards.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
