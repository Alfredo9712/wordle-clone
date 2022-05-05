import type { NextPage } from "next";

import HomeContent from "../components/content/HomeContent";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HomeContent />
    </div>
  );
};

export default Home;
