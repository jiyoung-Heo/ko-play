import { useDispatch, useSelector } from "react-redux";
import styles from "./BlueBox.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import {motion} from 'framer-motion';
import modifyStudentInfoAxios from "@/app/axios/modifyStudentInfoAxios";
import studentInfo, { changeStudentInfo } from "@/redux/slices/studentInfoSlice";

export default function BlueBox(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.studentInfo)
  return (
    <div
      className={styles.BlueBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      onClick={async ()=>{
        await modifyStudentInfoAxios({...userInfo, visited : true, nickname : props.nickname, schoolName : props.school})
        let firstUserInfo = await student();
        dispatch(changeStudentInfo(firstUserInfo));
        dispatch(changeModalIdx(0));
      }}
    >
      <motion.div 
      className={styles.BlueBoxTop}
      whileTap={{
        translateY : "5px",
        translateX : "-5px",
        boxShadow : "none"
      }}
      >{props.text}</motion.div>
      <div className={styles.BlueBoxBottom} />
    </div>
  );
}
