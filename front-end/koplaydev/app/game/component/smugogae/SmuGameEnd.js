"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./SmuGameEnd.module.scss";
import CardFrontImage from "../CardFrontImage";
import { motion, useAnimation } from "framer-motion";
import GameJellyBtn from "@/app/game/component/GameJellyBtn";
import gameResultAxios from "@/app/axios/gameResultAxios";
import ChangeNation from "@/app/avatar/component/ChangeNation";
import newAvatarAxios from "@/app/axios/newAvatarAxios";
import RewardJellyBtn from "../RewardJellyBtn";

export default function SmuGameEnd() {
  const userInfo = useSelector((state) => state.studentInfo);
  const wrongList = useSelector((state) => state.wrong);
  const Incorrect = useSelector((state) => state.incorrect);
  const exp = useSelector((state) => state.exp);
  const gameIdx = useSelector((state) => state.game);
  const gameList = useSelector((state) => state.level);
  const beforeExp = userInfo.exp % 100;
  const afterExp = 120;

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showRewardButton, setShowRewardButton] = useState(false);
  const [newAvatars, setNewAvatars] = useState(null);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    const postGameResult = async () => {
      const res = await gameResultAxios(
        gameIdx,
        3 - wrongList.length,
        3,
        gameList[2],
        exp
      );
    };

    postGameResult();
  }, []);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wrongVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  let nation = "kr-KR";
  if (userInfo.nation === "Thailand") {
    nation = "th-TH";
  } else if (userInfo.nation === "Vietnam") {
    nation = "vi-VN";
  } else if (userInfo.nation === "China") {
    nation = "zh-CN";
  }

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "kr-KR";
    window.speechSynthesis.speak(utterance);
  };

  const speakForeignWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = nation;
    window.speechSynthesis.speak(utterance);
  };

  const expAnimation = useAnimation();

  useEffect(() => {
    if (afterExp > 100) {
      expAnimation
        .start({
          width: "100%",
          transition: {
            duration: (100 - beforeExp) / 30,
            ease: "easeInOut",
          },
        })
        .then(() => {
          setShowLevelUp(true);
          setShowRewardButton(true);
          expAnimation.set({ width: "0%" });
          expAnimation.start({
            width: `${afterExp % 100}%`,
            transition: {
              duration: (afterExp % 100) / 30,
              ease: "easeInOut",
            },
          });
        });
    } else {
      expAnimation.start({
        width: `${afterExp}%`,
        transition: {
          duration: exp / 30,
          ease: "easeInOut",
        },
      });
    }
  }, [afterExp, beforeExp, expAnimation]);

  const handleRewardClick = () => {
    setShowBlackScreen(true);
    setShowRewardButton(false);
    setTimeout(() => {
      document
        .querySelector(`.${styles.blackScreen}`)
        .classList.add(styles.show);
    }, 10);
  };

  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
    const newAvatarData = await newAvatarAxios(country);
    if (newAvatarData) {
      setNewAvatars(newAvatarData);
      setShowAvatar(true);
    }
    setTimeout(() => {
      document.querySelector(`.${styles.nationSelect}`).style.display = "none";
    }, 0);
    setTimeout(() => {
      setShowAvatar(false);
      setShowBlackScreen(false);
    }, 6000);
  };

  return (
    <>
      {showBlackScreen && (
        <motion.div
          className={`${styles.blackScreen} ${showAvatar ? styles.show : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showBlackScreen ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.nationSelect}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <ChangeNation
              setSelectedCountry={handleCountrySelect}
              left="25vw"
              top="40vh"
              imgSize="calc(5vw + 7vh)"
            />
          </motion.div>
          {showAvatar && newAvatars && (
            <motion.div
              className={styles.avatarContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={newAvatars[0].avatar.avatarFile}
                alt="New Avatar"
                className={styles.avatar}
              />
            </motion.div>
          )}
        </motion.div>
      )}
      <div className={styles.EndPage}>
        <motion.div
          className={styles.ExpBar}
          initial={{
            opacity: 0,
          }}
          animate={{
            translateY: `${Incorrect ? null : "120%"}`,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <motion.div
            className={styles.Exp}
            initial={{
              width: `${beforeExp}%`,
            }}
            animate={expAnimation}
          ></motion.div>
          {showLevelUp && (
            <motion.div
              className={styles.levelUpImage}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <img src="/level-up.png" alt="Level Up" />
            </motion.div>
          )}
        </motion.div>
        {Incorrect ? (
          <motion.div
            className={styles.Incorrect}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {wrongList.map((data, index) => (
              <motion.div
                key={index}
                className={styles.wrong}
                variants={wrongVariants}
              >
                <CardFrontImage width="18" height="100" imgSrc={data.imgUrl} />
                <div className={styles.KoreaWord}>
                  {data.wordKor}
                  <img
                    src="/WordSound.png"
                    onClick={() => speakWord(data.wordKor)}
                  />
                </div>
                <div className={styles.ForeignWord}>
                  {data.wordVietnam}
                  <img
                    src="/WordSound.png"
                    onClick={() => speakForeignWord(data.wordVietnam)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.characterContainer}>
            <img
              className={styles.character}
              src="/character-dancingMachine.gif"
            />
            <div className={styles.videoBack}></div>
          </div>
        )}
      </div>
      {showRewardButton && (
        <motion.div
          className={styles.RewardButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
        >
          <RewardJellyBtn
            width="100"
            height="100"
            bg="#FFD6E0"
            shadow="#E07A93"
            text="보상열기"
            bottom="3"
            onClick={handleRewardClick}
          />
        </motion.div>
      )}
      <motion.div
        className={styles.GoMain}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 5,
          },
        }}
      >
        <GameJellyBtn
          width="100"
          height="100"
          bg="#FFD6E0"
          shadow="#E07A93"
          text="나가기"
        />
      </motion.div>
    </>
  );
}
