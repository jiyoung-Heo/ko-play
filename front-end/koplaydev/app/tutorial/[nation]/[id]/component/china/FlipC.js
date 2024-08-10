"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";

export default function FlipC() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/flipflip/flipC1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/flipflip/flipC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/flipflip/flipC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/flipflip/flipC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/flipflip/flipC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC9.png",
  ];

  const handleNextStep = () => {
    if (currentStep < tutorialImages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/main");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.tutorialContainer}>
      <img
        src={tutorialImages[currentStep]}
        alt={`Tutorial Step ${currentStep + 1}`}
      />
      <button
        className={`${styles.navButton} ${styles.leftButton}`}
        onClick={handlePrevStep}
        disabled={currentStep === 0}
      >
        ◀
      </button>
      <button
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={handleNextStep}
      >
        ▶
      </button>
    </div>
  );
}
