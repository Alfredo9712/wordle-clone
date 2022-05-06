import { NextPage } from "next";
import React from "react";
import classNames from "classnames";
import styles from "./Board.module.scss";

interface BoardProps {
  board: {
    character: string;
    isCorrectPosition: boolean;
    isLetterInWord: boolean;
  }[][];
}

const Board: NextPage<BoardProps> = ({ board }) => {
  return (
    <div className={styles.board}>
      {board.map((row, index) => (
        <div className={styles.row} key={index}>
          {row.map((cell, index) => {
            const cellClasses = classNames(styles.cell, {
              [styles.correctCellPosition]: cell.isCorrectPosition,
              [styles.characterIsInWord]: cell.isLetterInWord,
            });
            return (
              <div key={index} className={cellClasses}>
                {cell.character}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
