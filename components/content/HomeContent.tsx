import { NextPage } from "next";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import { randomWord } from "../../wordBank";
import Board from "../Board";
import { wordBank } from "../../wordBank";
import styles from "./HomeContent.module.scss";

const HomeContent: NextPage = () => {
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [filledRow, setFilledRow] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [board, setBoard] = useState([
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
    ],
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
    ],
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
    ],
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
    ],
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
    ],
    [
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
      { character: "", isCorrectPosition: false, isLetterInWord: false },
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
    console.log(inputRef.current?.value);
    if (inputRef.current) {
      const wordArray = wordMemo.split("");
      const guessArray = inputRef.current?.value.split("");
      const guess = guessArray.map((c, i) => {
        if (wordArray[i] === guessArray[i]) {
          return {
            character: c,
            isCorrectPosition: true,
            isLetterInWord: true,
          };
        }
        if (wordArray.includes(guessArray[i])) {
          return {
            character: c,
            isCorrectPosition: false,
            isLetterInWord: true,
          };
        } else {
          return {
            character: c,
            isCorrectPosition: false,
            isLetterInWord: false,
          };
        }
      });
      const updatedBoard = board.map((row, idx) =>
        idx === attempts ? (row = guess) : row
      );
      setBoard(updatedBoard);
      console.log(guess);
    }
  };
  const submitGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value === wordMemo) {
      alert("you win");
      setCorrectGuess(true);
    }
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
      setAttempts((attempts) => attempts + 1);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
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
      {lettersGuessed.length > 0 && <div className={styles.input}> </div>}
      <form onSubmit={submitGuess}>
        <input
          ref={inputRef}
          autoFocus
          disabled={correctGuess === true}
          className={styles.input}
          maxLength={5}
          onChange={(e) => fillBoard(e.target.value)}
        />
        <button type="submit" hidden disabled={correctGuess === true}></button>
      </form>
    </div>
  );
};

export default HomeContent;
