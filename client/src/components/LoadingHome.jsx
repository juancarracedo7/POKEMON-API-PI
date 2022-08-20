import React from "react";
import { Link } from "react-router-dom";
import styles from './LoadingHome.module.css'

export default function LoadingHome(){
    return (
        <div className={styles.loading} >
            <h1 className={styles.h1}>Loading Please Wait ...</h1>
            <Link to='/'><h2>RESTART</h2></Link>
            <img className={styles.img} src={'https://i.pinimg.com/originals/1b/a3/5b/1ba35b202e3ec209dbd6c6d41ee11fc9.gif'}   alt="not found" />
        </div>
      );
};