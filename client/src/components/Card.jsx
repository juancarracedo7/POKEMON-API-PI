import React from "react";
import styles from './Card.module.css'

export default function Card({ name, image, types,  }) {
  // console.log('holaaaaa',types)

  return (
    <div className={styles.card}>
      <img  className={styles.img} src={image} alt="not found" />
      <h3 className={styles.h3}>{name}</h3>

      <div className={styles.p}>
        {types?.map((type, index) => (
          <p key={index}>{type}</p>
        ))}
      </div>
    </div>
  );
}
