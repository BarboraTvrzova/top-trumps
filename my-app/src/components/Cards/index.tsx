export type Card = {
  name: string;
  category: string;
  record: number;
  year: string | number;
  country: string;
  attempt_tries: number;
  times_broken: number;
  image_url: string;
  id?: number | null;
};

export type Selectable = "record" | "attempt_tries" | "times_broken";
const Cards = ({
  data,
  onClick,
  isHidden,
  selected,
}: {
  data: Card[];
  onClick?: (options: { value: number; selected: Selectable }) => void;
  isHidden?: boolean;
  selected?: Selectable;
}) => {
  const handleClick = (options: { value: number; selected: Selectable }) => {
    if (onClick) {
      onClick(options);
    }
  };

  return (
    <div className="w-56 h-80 relative shadow-xl rounded-md mx-auto">
      {data.map((card, i) => {
        return (
          <div
            key={card.name}
            className="w-full h-full bg-white text-black p-4 absolute top-0 left-0 rounded-lg"
            style={{ zIndex: -i }}
          >
            <h2>{card.name}</h2>
            <h3 className="italic">{card.category}</h3>
            <div className="mt-4">
              <h3>Stats</h3>
              <ul>
                <li
                  className={`${
                    selected === "record" ? "bg-blue-700 text-white" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      handleClick({ value: card.record, selected: "record" })
                    }
                    disabled={Boolean(selected)}
                    className="hover:scale-[1.01] hover:text-blue-700 disabled:pointer-events-none"
                  >
                    Record: {card.record}
                  </button>
                </li>
                <li
                  className={`${
                    selected === "attempt_tries" ? "bg-blue-700 text-white" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      handleClick({
                        value: card.attempt_tries,
                        selected: "attempt_tries",
                      })
                    }
                    disabled={Boolean(selected)}
                    className="hover:scale-[1.01] hover:text-blue-700 disabled:pointer-events-none"
                  >
                    Attempts: {card.attempt_tries}
                  </button>
                </li>
                <li
                  className={`${
                    selected === "times_broken" ? "bg-blue-700 text-white" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      handleClick({
                        value: card.times_broken,
                        selected: "times_broken",
                      })
                    }
                    disabled={Boolean(selected)}
                    className="hover:scale-[1.01] hover:text-blue-700 disabled:pointer-events-none"
                  >
                    Broken: {card.times_broken}
                  </button>
                </li>
              </ul>
            </div>
            <p className="mt-5">
              This record was attempted in {card.country} in {card.year}
            </p>
          </div>
        );
      })}
      {isHidden ? (
        <div className="absolute w-full h-full bg-black rounded-md top-0 left-0">
          <img src={"/card.png"} alt="" className="w-full h-full rounded-md" />
        </div>
      ) : null}
    </div>
  );
};

export default Cards;
