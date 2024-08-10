"use client";

import { useDispatch } from "react-redux";
import styles from "./MainIcons.module.scss";
import { motion } from "framer-motion";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function MainIcons() {
  const dispatch = useDispatch();
  return (
    <>
      <motion.img
        className={styles.hehe}
        src="/hehe.png"
        alt=""
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
      <div className={styles.normalGameContainer}>
        <motion.img
          className={styles.normalGame}
          src="/realnormal.png"
          alt=""
          onClick={() => {
            dispatch(changeModalIdx(1));
          }}
          whileHover={{
            scale: 1.1,
            rotate: "10deg",
          }}
        />
        <div className={styles.normalGameText}>일반게임</div>
      </div>
      <div className={styles.rankGameContainer}>
        <motion.img
          className={styles.rankGame}
          src="rank-game.png"
          alt=""
          onClick={() => {
            dispatch(changeModalIdx(4));
          }}
          whileHover={{
            scale: 1.1,
            rotate: "-10deg",
          }}
        />
        <div className={styles.rankGameText}>랭크게임</div>
      </div>
      <motion.img
        className={styles.speechBubble}
        src="speechBubble.png"
        alt=""
        animate={{
          translateY: [0, -5, 0],
          transition: {
            repeat: Infinity,
            duration: 2,
          },
        }}
      />
    </>
  );
}
