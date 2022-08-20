import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'

export default function Landing(){
  return (
    <div className={styles.landing}>
      <div><h1 className={styles.h1}>Welcome to the POKEAPI</h1></div>
      <Link to="/home">
        <div>
          <img className={styles.img} src="https://cdn-icons-png.flaticon.com/512/914/914726.png" alt="not today"/>
        </div>
      </Link>
    </div>
  );
}