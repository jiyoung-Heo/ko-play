"use client";
import styles from "./CardFrontImage.module.scss";

// props : left, top, width, height
export default function CardFrontImage(props) {
  return (
    <div
      className={styles.cardContainer}
      styles={{
        left: `${props.left}`,
        top: `${props.top}`,
        width: `${props.width}`,
        height: `${props.height}`,
      }}
    >
      <div className={styles.cardOuter}>
        <div className={styles.cardInner}>
          <img
            src={props.imgSrc}
            alt="Card Front"
            className={styles.cardImage}
          />
        </div>
      </div>
    </div>
  );
}
