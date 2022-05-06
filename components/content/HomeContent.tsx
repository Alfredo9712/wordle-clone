import { NextPage } from "next";
import React, { useRef, useState, useLayoutEffect, useMemo } from "react";
import { randomWord } from "../../wordBank";
import Board from "../Board";
import { wordBank } from "../../wordBank";
import styles from "./HomeContent.module.scss";

const HomeContent: NextPage = () => {
  const [attempts, setAttempts] = useState(0);
  const [filledRow, setFilledRow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [board, setBoard] = useState([
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
    [
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
      {
        character: "",
        isCorrectPosition: false,
        isLetterInWord: false,
        incorrectGuess: false,
      },
    ],
  ]);
  const wordMemo = useMemo(() => randomWord(), []).toLocaleLowerCase();
  console.log(wordMemo);
  const fillBoard = (letter: string) => {
    if (inputRef.current) {
      const characters: any = inputRef.current.value.split("").map(
        (c) =>
          c && {
            character: c,
            isCorrectPosition: false,
            isLetterInWord: false,
            inincorrectGuess: false,
          }
      );
      if (letter.length === 5) setFilledRow(true);
      const updatedBoard = board.map((row, idx) =>
        idx === attempts ? (row = characters) : row
      );
      setBoard(updatedBoard);
    }
  };
  const compareGuess = () => {
    if (inputRef.current) {
      const wordArray = wordMemo.split("");
      const guessArray = inputRef.current?.value.split("");
      const guess = guessArray.map((c, i) => {
        if (wordArray[i] === guessArray[i]) {
          return {
            character: c,
            isCorrectPosition: true,
            isLetterInWord: true,
            incorrectGuess: false,
          };
        }
        if (wordArray.includes(guessArray[i])) {
          return {
            character: c,
            isCorrectPosition: false,
            isLetterInWord: true,
            incorrectGuess: false,
          };
        } else {
          return {
            character: c,
            isCorrectPosition: false,
            isLetterInWord: false,
            incorrectGuess: true,
          };
        }
      });
      const updatedBoard = board.map((row, idx) =>
        idx === attempts ? (row = guess) : row
      );
      setBoard(updatedBoard);
    }
  };
  const submitGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      filledRow &&
      inputRef.current &&
      !wordBank.includes(
        inputRef.current?.value.charAt(0).toUpperCase() +
          inputRef.current?.value.slice(1)
      )
    )
      return;
    if (filledRow && inputRef.current) {
      compareGuess();
      if (inputRef.current?.value === wordMemo) {
        setTimeout(() => {
          alert("you win");
        }, 100);
        setGameOver(true);
        return;
      }
      setAttempts((attempts) => attempts + 1);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
    if (attempts === 5) {
      setGameOver(true);
      setTimeout(() => {
        alert(`Game Over! Word was ${wordMemo}`);
      }, 100);
    }
  };
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className={styles.homeContent}>
      <h1>Wordle</h1>
      <Board {...{ board }} />
      <form onSubmit={submitGuess}>
        <input
          ref={inputRef}
          autoFocus
          disabled={gameOver === true}
          className={styles.input}
          maxLength={5}
          onChange={(e) => fillBoard(e.target.value)}
        />
        <button type="submit" hidden disabled={gameOver === true}></button>
      </form>
    </div>
  );
};

export default HomeContent;
