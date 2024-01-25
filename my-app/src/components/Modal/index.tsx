import type { Winner } from "../../hooks/useCards";

const Modal = ({ winner }: { winner: Winner }) => {
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-20 p-4 flex items-center justify-center ">
      <div className="w-fit h-fit bg-white flex flex-col items-center justify-center p-20">
        <h2 className="text-2xl text-center text-black">
          {winner === "computer"
            ? "Sorry, better luck next time!"
            : "Congratulatons, you won!"}
        </h2>
        <button
          onClick={reload}
          className="px-14 mt-4 py-3 bg-rose-800 rounded-md leading-[1] inline-flex items-center justify-center disabled:opacity-30"
        >
          Start again
        </button>
      </div>
    </div>
  );
};

export default Modal;
