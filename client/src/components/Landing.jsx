import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'

export default function Landing(){
  return (
    <div className={styles.landing}>
      <h1 className={styles.h1}>Welcome to the POKEAPI</h1>
      <Link to="/home">
        <div>
          <button className={styles.button}>Home!</button>
        </div>
      </Link>
    </div>
  );
}