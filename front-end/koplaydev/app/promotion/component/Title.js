"use client";

import styles from "./Title.module.scss";
import { motion } from "framer-motion";
import useSound from "@/app/utils/useSound";
import { useSelector } from "react-redux";

const loginBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/loginBGM.wav';
const loginBGM2 = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/loginBGM2.mp3';

export default function Title() {
  useSound(loginBGM2, 1, 2000);
  const translationWords = useSelector((state) => state.translationWords);
  
  let title1 = Array.from(translationWords.title1);
  let title2 = Array.from(translationWords.title2);
  
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };


  return (
    <div className={styles.promotionTitle}>
      <motion.div
        className={styles.promotionTitle1}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {title1.map((data, index) => {
          return <motion.span key={index} variants={letterVariants}>{data}</motion.span>;
        })}
      </motion.div>
      <motion.div className={styles.promotionTitle2}>
        {title2.map((data, index) =>
          index < 12 ? (
            <motion.span key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {data}
            </motion.span>
          ) : (
            <motion.span key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {data}
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
}
