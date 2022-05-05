import { NextPage } from "next";
import React from "react";

import styles from "./Board.module.scss";

interface BoardProps {
  board: string[][];
}

const Board: NextPage<BoardProps> = ({ board }) => {
  console.log(board[0][1]);
  return (
    <div className={styles.board}>
      {board.map((row, index) => (
        <div className={styles.row}>
          {row.map((cell) => (
            <div className={styles.cell}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
