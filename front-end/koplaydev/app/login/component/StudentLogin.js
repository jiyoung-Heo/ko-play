"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.scss";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { changeTokenIdx } from "@/redux/slices/tokenSlice";
import { changeStudentInfo } from "@/redux/slices/studentInfoSlice";

export default function StudentLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  // 각각의 입력 필드에 대한 useRef 선언
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  // 상태 변수로 token 관리
  const [token, setToken] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  // 쿠키에서 특정 값을 가져오는 함수
  function getCookieValue(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // token 변경 시 Redux 상태 업데이트
  useEffect(() => {
    if (token) {
      dispatch(changeTokenIdx(token)); // Redux 상태 업데이트
    }
  }, [token, dispatch]); // token이나 dispatch가 변경될 때마다 실행

  useEffect(() => {
    if (studentInfo) {
      dispatch(changeStudentInfo(studentInfo)); // Redux 상태 업데이트
    }
  }, [studentInfo, dispatch]); // token이나 dispatch가 변경될 때마다 실행

  // 버튼 클릭 시 실행되는 함수
  const handleClick = () => {
    const formData = new FormData();

    // 입력 필드의 값을 올바르게 가져와서 FormData에 추가
    formData.append('id', idRef.current.value);
    formData.append('password', passwordRef.current.value);

    // 값 확인을 위해 콘솔에 출력
    console.log("ID:", idRef.current.value, "Password:", passwordRef.current.value);

    axios.post('http://localhost:8080/login',
      formData, { withCredentials: true },
    )
    .then((res) => {
      console.log('Response:', res);

      // 쿠키에서 Authorization 토큰 가져오기
      const authToken = getCookieValue('Authorization');
      if(authToken == null){
        throw error;
      }
      setToken(authToken); // 상태 업데이트로 token 설정
      
      console.log('Auth Token:', authToken);
      // 성공적으로 로그인 시 메인 페이지로 이동
      // 그전에 로그인 정보 먼저 받아오기
      // console.log(token);
      // console.log(token.value);
      const config = {
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${authToken}`
        },
      }
      console.log(authToken)
      axios.get('http://localhost:8080/students/info', config
      )
      .then((res) => {
        console.log('Response:', res.data.data[0]);
        setStudentInfo(res.data.data[0])
        // router.push("/main");
      })
      .catch((e) => {
        alert("정보 받아오기 실패");
        console.error('Error:', e);
      });

      router.push("/main");
    })
    .catch((e) => {
      alert("로그인 실패");
      console.log(e);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.idInput}
          type="text"
          id="username" // 고유한 ID 설정
          ref={idRef}
          placeholder="아이디를 입력하세요"
        />
        <input
          className={styles.pwInput}
          type="password"
          id="password" // 고유한 ID 설정
          ref={passwordRef}
          placeholder="비밀번호를 입력하세요"
          required
        />
        <div className={styles.infoText}>
          아이디와 비밀번호는 부모님 계정에서 발급 가능합니다.
        </div>
      </div>
      <button className={styles.loginBtn} onClick={handleClick}>
        로그인
      </button>
    </div>
  );
}
