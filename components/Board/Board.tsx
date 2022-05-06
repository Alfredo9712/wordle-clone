import { NextPage } from "next";
import React from "react";

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
          {row.map((cell, index) => (
            <div key={index} className={styles.cell}>
              {cell.character}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
