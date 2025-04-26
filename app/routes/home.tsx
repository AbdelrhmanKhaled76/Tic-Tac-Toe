import { useState, type Dispatch, type SetStateAction } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tic Tac Toe game" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [roundes, setRoundes] = useState<number>(0);
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [winningPosIdx, setWinningPosIdx] = useState<number | null>(null);
  // all the winning indexes
  const winningPositions: number[][] = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [6, 7, 8],
    [2, 5, 8],
  ];
  const [ending, setEnding] = useState<boolean>(false);

  function handleClick(index: number): void {
    const ticTacToe: string[] = board;
    if (board[index] || ending) {
      return;
    }
    ticTacToe[index] = roundes % 2 === 0 ? "X" : "O";
    if (!ending) {
      winningPositions.forEach(([a, b, c], idx) => {
        if (
          ticTacToe[a].length &&
          ticTacToe[b].length &&
          ticTacToe[c].length &&
          ticTacToe[a] === ticTacToe[b] &&
          ticTacToe[b] === ticTacToe[c]
        ) {
          setWinningPosIdx(idx);
          setEnding(true);
        }
      });
    }
    setRoundes(roundes + 1);
  }
  function handlePlayAgain(): void {
    setBoard(Array(9).fill(""));
    setRoundes(0);
    setEnding(false);
    setWinningPosIdx(null);
  }
  return (
    <>
      <h1 className="text-center pt-20 text-[40px] text-white">
        Welcome to my Tic Tac Toe game
      </h1>
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex justify-center items-center  ">
        <div className="flex flex-col items-center gap-10">
          <div className="h-10 flex items-center">
            {ending ? (
              <div className="text-2xl font-bold text-white">
                Player {roundes % 2 === 0 ? 2 : 1} won!!
              </div>
            ) : roundes === 9 ? (
              <div className="text-2xl font-bold text-white">Draw!!</div>
            ) : (
              <div className="h-10"></div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-0">
            {board.map((grid, idx) => {
              const isWinningCell =
                winningPosIdx !== null &&
                winningPositions[winningPosIdx]?.includes(idx);
              return (
                <div
                  className={`transition-all duration-500 w-32 h-32 border border-black flex justify-center items-center text-5xl font-bold font-mono  ${
                    isWinningCell
                      ? "bg-green-400 text-white rotate-y-360"
                      : board[idx]
                      ? "bg-gray-400 text-white rotate-x-360"
                      : "bg-white rotate-0"
                  }`}
                  key={idx}
                  onClick={() => handleClick(idx)}
                >
                  {grid}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center">
            {ending ? (
              <button
                className="border p-3 rounded cursor-pointer hover:bg-white transition-colors duration-500"
                type="button"
                onClick={() => handlePlayAgain()}
              >
                play Again!
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
