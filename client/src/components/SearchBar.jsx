import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeName } from "../actions";
import styles from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    

    function handleInput(e){
      e.preventDefault();
      setName(e.target.value); // guardo el imput
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokeName(name)) // el name hace referencia a mi estado local
        setName('')
    }

    return (
        <div>
            <input className={styles.text} type="text" placeholder="Search" onChange={e => handleInput(e)} />
            <button className={styles.button} type='submit' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )


}