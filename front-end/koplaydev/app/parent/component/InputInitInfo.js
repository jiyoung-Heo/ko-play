
import CompleteBox from "./CompleteBox";
import styles from "./InputInitInfo.module.scss";
import { useState } from "react";

export default function InputInitInfo({ onClose, setChildInfo }) {
    const [formState, setFormState] = useState({
        listening1: '',
        listening2: '',
        listening3: '',
        listening4: '',
        reading1: '',
        reading2: '',
        reading3: '',
        reading4: '',
        speaking1: '',
        speaking2: '',
        speaking3: '',
        speaking4: ''
    });

        // 닫기 버튼 클릭 시 실행되는 함수
        const handleClose = () => {
            // 상태 초기화
            setChildInfo({
                name: '',
                id: '',
                pw: '',
                birth: '',
            });
            // 모달 닫기
            onClose();
        };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculateScore = (value) => {
        if (value === 'yes') return 3;
        if (value === 'so') return 2;
        if (value === 'no') return 1;
        return 0;
    };

    const calculateLevel = (scores) => {
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / scores.length;

        if (averageScore >= 2.5) return 5;
        if (averageScore >= 2.0) return 4;
        if (averageScore >= 1.5) return 3;
        if (averageScore >= 1.0) return 2;
        return 1;
    };

    const handleSubmit = () => {
        const listeningScores = [
            calculateScore(formState.listening1),
            calculateScore(formState.listening2),
            calculateScore(formState.listening3),
            calculateScore(formState.listening4)
        ];

        const readingScores = [
            calculateScore(formState.reading1),
            calculateScore(formState.reading2),
            calculateScore(formState.reading3),
            calculateScore(formState.reading4)
        ];

        const speakingScores = [
            calculateScore(formState.speaking1),
            calculateScore(formState.speaking2),
            calculateScore(formState.speaking3),
            calculateScore(formState.speaking4)
        ];

        const listeningLevel = calculateLevel(listeningScores);
        const readingLevel = calculateLevel(readingScores);
        const speakingLevel = calculateLevel(speakingScores);

        // childInfo 초기화
        setChildInfo({
            name: '',
            id: '',
            pw: '',
            birth: '',
            listeningLevel: listeningLevel,
            readingLevel: readingLevel,
            speakingLevel: speakingLevel,
        });

        // 모달 닫기
        onClose();
    };

    return (
        <>
            <div className={styles.overlay} ></div>
            
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>초기 정보 입력</h2>
                    <img className={styles.closeButton} onClick={handleClose} src="close.png" alt="" />
                    <img className={styles.star} src="Star-bg.png" alt="" />
                    <img className={styles.planet} src="planet-bg.png" alt="" />
                    <img className={styles.ufo} src="ufo-bg.png" alt="" />
                    <div className={styles.infomation}>
                        <div className={styles.table}>
                            {/* Listening Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">듣기(Listening)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableContent}>1. 자녀가 일상 대화를 이해할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='listening1' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio" name='listening1' value='no' onChange={handleRadioChange}/>아니오</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>2. 자녀가 간단한 명령이나 지시를 이해할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening2' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio"  name='listening2' value='no' onChange={handleRadioChange}/>아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>3. 자녀가 짧은 이야기나 설명을 이해할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening3' value='yes' onChange={handleRadioChange}/>예</label> <label><input type="radio"  name='listening3' value='no' onChange={handleRadioChange} />아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>4. 자녀가 국어(또는 학습할 언어)로 된 노래나 동화를 듣고 이해할 수 있는 정도는 어느 정도인가요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='listening4' value='yes'  onChange={handleRadioChange}/>잘 이해한다</label><label><input type="radio"  name='listening4' value='so' onChange={handleRadioChange}/>보통이다</label><label><input type="radio" name='listening4' value='no'  onChange={handleRadioChange}/>거의 이해하지 못한다</label>
                                            </div></td></tr>
                                </tbody>
                            </table>

                            {/* Reading Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">읽기(Reading)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableContent}>1. 자녀가 간단한 문장을 읽고 이해할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='reading1' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio" name='reading1' value='no' onChange={handleRadioChange}/>아니오</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>2. 자녀가 짧은 이야기나 동화를 읽을 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='reading2' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio"  name='reading2' value='no' onChange={handleRadioChange}/>아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>3. 자녀가 길고 복잡한 문장을 읽을 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='reading3' value='yes' onChange={handleRadioChange}/>예</label> <label><input type="radio"  name='reading3' value='no' onChange={handleRadioChange} />아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>4. 자녀가 국어(또는 학습할 언어)로 된 간단한 책을 읽을 수 있는 정도는 어느 정도인가요?</td></tr>
                                    <tr> <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='reading4' value='yes'  onChange={handleRadioChange}/>잘 이해한다</label><label><input type="radio"  name='reading4' value='so' onChange={handleRadioChange}/>보통이다</label><label><input type="radio" name='reading4' value='no'  onChange={handleRadioChange}/>거의 이해하지 못한다</label>
                                            </div></td></tr>
                                </tbody>
                            </table>

                            {/* Speaking Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">말하기(Speaking)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableContent}>1. 자녀가 간단한 인사말이나 자기소개를 한국어(또는 학습할 언어)로 할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='speaking1' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio" name='speaking1' value='no' onChange={handleRadioChange}/>아니오</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>2. 자녀가 일상적인 대화를 국어(또는 학습할 언어)로 할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='speaking2' value='yes' onChange={handleRadioChange} />예</label> <label><input type="radio"  name='speaking2' value='no' onChange={handleRadioChange}/>아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>3. 자녀가 자신의 생각이나 의견을 국어(또는 학습할 언어)로 표현할 수 있나요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='speaking3' value='yes' onChange={handleRadioChange}/>예</label> <label><input type="radio"  name='speaking3' value='no' onChange={handleRadioChange} />아니오</label></td></tr>
                                    <tr><td className={styles.tableContent}>4. 자녀가 국어(또는 학습할 언어)로 자신의 일상생활이나 경험을 이야기할 수 있는 정도는 어느 정도인가요?</td></tr>
                                    <tr><td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='speaking4' value='yes'  onChange={handleRadioChange}/>잘 이해한다</label><label><input type="radio"  name='speaking4' value='so' onChange={handleRadioChange}/>보통이다</label><label><input type="radio" name='speaking4' value='no'  onChange={handleRadioChange}/>거의 이해하지 못한다</label>
                                            </div></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.completeBoxContainer} onClick={handleSubmit}>
                        <CompleteBox text="등록" width={50} height={88}/>
                    </div>
                </div>
            </div>
        </>
    );
}
