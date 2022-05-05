import { NextPage } from "next";
import React, { useState } from "react";
import Board from "../Board";

import styles from "./HomeContent.module.scss";

const HomeContent: NextPage = () => {
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  console.log(board);
  return (
    <div className={styles.homeContent}>
      <h1>Wordle</h1>
      <Board {...{ board }} />
    </div>
  );
};

export default HomeContent;
