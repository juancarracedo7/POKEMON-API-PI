import React from "react";
import styles from './LoadingHome.module.css'

export default function LoadingHome(){
    return (
        <div className={styles.loading} >
            <h1 className={styles.h1}>Poke not found... reload😪</h1>
            {/* <img className={styles.img} src={'https://i.pinimg.com/originals/88/d2/88/88d28805410091333b030766f7336973.gif'}   alt="not found" /> */}
        </div>
      );
};