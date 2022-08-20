import React from "react";
import { Link } from "react-router-dom";
import styles from './LoadingHome.module.css'

export default function LoadingHome(){
    return (
        <div className={styles.loading} >
            <h1 className={styles.h1}>Loading Please Wait ...</h1>
            <Link to='/' className={styles.link}><h2>RESTART</h2></Link>
            <img className={styles.img} src={'https://i.pinimg.com/originals/88/d2/88/88d28805410091333b030766f7336973.gif'}   alt="not found" />
        </div>
      );
};