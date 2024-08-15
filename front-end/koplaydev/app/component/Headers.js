"use client";

import { usePathname } from "next/navigation";
import styles from "./Headers.module.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import effectSound from '@/app/utils/effectSound'
import { changeTranslationWords } from "@/redux/slices/translationWords";
import translations from "../axios/translations";
import { changeCurrNation } from "@/redux/slices/currNationSlice";

const mouseClickSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3';

export default function Headers() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.studentInfo);
  const parent = useSelector((state) => state.parent);
  const currNation = useSelector((state) => state.currNation);
  // const [selectedNation, setSelectedNation] = useState(null);
  const pathName = usePathname();
  const exceptList = ["game", "tutorial"];
  const translationWords = useSelector((state) => state.translationWords);

  const nations = [
    { name: "Korea", src: "/korea-3.png", locale: "ko-KR" },
    { name: "Thailand", src: "/thailand-parent-choice.png", locale: "th-TH" },
    { name: "China", src: "/china-3.png", locale: "zh-CN" },
    { name: "Vietnam", src: "/vietnam-3.png", locale: "vi-VN" },
  ];

  useEffect(() => {
    const fetchTranslations = async () => {
      const defaultNation = userInfo.nation || parent.nationality || "Korea";
      dispatch(changeCurrNation(defaultNation))
      const index = nations.findIndex((data2) => data2.name === defaultNation)
      dispatch(changeTranslationWords(await translations(nations[index].locale)));
    }
    fetchTranslations();
  }, [userInfo, parent]);

  useEffect(() => {
    const fetchTranslations = async () => {
      const defaultNation = currNation || "Korea";
      const index = nations.findIndex((data2) => data2.name === defaultNation)
      dispatch(changeTranslationWords(await translations(nations[index].locale)));
    }
    fetchTranslations();
  }, [currNation]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const result = await translations("ko-KR");
        dispatch(changeTranslationWords(result));
      } catch (error) {
        console.error("Failed to fetch translations:", error);
      }
    };

    fetchTranslations(); // 비동기 함수 호출
  }, []); // asPath가 변경될 때마다 useEffect가 실행됩니다.

  const handleNationClick = async (nation) => {
    console.log(nation.name)
    dispatch(changeCurrNation(nation.name))
    // setSelectedNation(nation.name);
    // console.log(nation.locale)
    //국제화 백에 호출해서 text 세팅
    dispatch(changeTranslationWords(await translations(nation.locale)));
  };

  const shouldHideHeader = exceptList.some((word) => pathName.includes(word));
  const es = effectSound(mouseClickSound, 0.5);

  return (
    <>
      {!shouldHideHeader && (
        <div className={styles.header}>
          {nations.map((nation, index) => (
            <motion.img
              key={index}
              src={nation.src}
              onClick={() => {
                es.play();
                handleNationClick(nation);
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              animate={{
                scale: currNation === nation.name ? 1.4 : 1,
                transition: {
                  duration: 0.3,
                },
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
