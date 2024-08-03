"use client";

import 'regenerator-runtime/runtime';
import { motion } from "framer-motion";
import styles from './GameJellyBtn.module.scss';
import { useDispatch } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeInCorrect } from "@/redux/slices/Incorrect";
import SpeechRecognition from 'react-speech-recognition';

export default function LevelJellyBtn(props) {
    const dispatch = useDispatch()
    const router = useRouter();
  return (
    <motion.div
      className={styles.LevelJellyBtn}
      style={{
        width : `${props.width}%`,
        height : `${props.height}%`
      }}
      whileHover={{
        scale: [1, 1.1, 1],
        transition : {
          duration : 0.3
        }
      }}
      onClick={()=>{
        if(props.text === "예"){
          dispatch(changeInCorrect(true));
          dispatch(changeLoadingIdx(1));
        }else if(props.text === "아니요"){
          dispatch(changeInCorrect(false));
          dispatch(changeLoadingIdx(1));
        }else{
        dispatch(changeModalIdx(0));
        dispatch(changeLoadingIdx(-1));
        dispatch(changeCorrectIdx(0));
          router.push("/main");
        }
        SpeechRecognition.stopListening();

      }}
    >
      <motion.div
        className={styles.LevelJellyBtnHover}
        whileTap={{
          translateY: "6px",
        }}
      >
        <div
          className={styles.LevelJellyBtnTop}
          style={{
            background: `${props.bg}`,
            color: props.color ,
          }}
        >
          {props.text}
        </div>
        <div className={styles.LevelJellyBtnDot} />
        <div className={styles.LevelJellyBtnDot2} />
      </motion.div>
      <div
        className={styles.LevelJellyBtnBottom}
        style={{ background: `${props.shadow}` }}
      />
    </motion.div>
  );
}
