import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({pokePage, allPoke,paginadoPoke}){
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allPoke/pokePage); i++) {
        pageNumber.push(i)
    }

    return(
        <nav className={styles.paginado}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    {pageNumber && pageNumber.map(n => {
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      return  <button className={styles.button} key={n} onClick={() => paginadoPoke(n)}>{n}</button>
                    })}
                </li>
            </ul>
        </nav>
    )
}