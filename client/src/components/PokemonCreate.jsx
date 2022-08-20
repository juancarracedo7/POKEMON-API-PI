import React from "react";
import { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getAllTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './PokemonCreate.module.css'

export default function PokemonCreate (){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        weight: '',
        height: '',
        img: '',
        types: [],
    })
   
    const [errors, setErrors] = useState({})
    function handleChange(e){
        setInput({
            ...input, // me guardo lo que tengo en el input y le agrego lo que escriben 
            [e.target.name]:e.target.value // seteo lo que escriben en el input
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    }

    function handleSelect(e){
        setInput({
            ...input,
            types:[...input.types,e.target.value]// puede tener mas de 1 temperamento
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postPokemon(input))
        alert('Pokemon succesfully created')
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            weight: '',
            height: '',
            img: '',
            types: [],
        })
        history.push('/home') // me redirige a la home luego de creado el personaje
    }

useEffect(()=> {
    dispatch(getAllTypes())
},[dispatch])

function validate(input){
    let errors={}
    const validation = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/g;
    if(!input.name){
        errors.name = 'name required'
        errors.required = true
    }else if (!/\S{1,15}[^0-9]/.test(input.name)){
        errors.name = 'Name is invalid';
        errors.required = true
    }
    if(input.hp < 0 || input.hp > 90){
        errors.hp = 'exceeds number of digits'
        errors.required = true
    }
    if(input.attack < 0 || input.attack > 120){
        errors.attack = 'exceeds number of digits'
        errors.required = true
    }
    if (input.defense < 0 || input.defense > 80) {
        errors.defense = 'exceeds number of digits'
        errors.required = true
    }
    if (input.height < 0 || input.height > 20) {
        errors.height = 'exceeds number of digits'
        errors.required = true
    }
    if (input.weight < 0 || input.weight > 600) {
        errors.weight = 'exceeds number of digits'
        errors.required = true
    }
    if (input.img && !validation.test(input.img)) {
        errors.img = 'URL invalid'
        errors.required = true
    }
   
    return errors
}


return (
  <div className={styles.divCreate}>
    <Link to="/home" className={styles.button2}>Back Home</Link>
    <h2>CREATE YOUR POKEMON!</h2>
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div className={styles.detail}>
        <label className={styles.label}>Name:</label>
        <input
         className={styles.input}
          type="text"
          value={input.value}
          name="name"
          onChange={(e) => handleChange(e)}
          required
        ></input>
        {errors.name &&(
            <p className={styles.danger}>{errors.name}</p>
        )}
      </div>
      <div className={styles.detail}>
        <label className={styles.label} >Hp:</label>
        <input
        className={styles.input}
          type="text"
          value={input.value}
          name="hp"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.hp &&(
            <p className={styles.danger}>{errors.hp}</p>
        )}
      </div>

      <div className={styles.detail}>
        <label className={styles.label}>Attack:</label>
        <input
         className={styles.input}
          type="text"
          value={input.value}
          name="attack"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.attack &&(
            <p className={styles.danger}>{errors.attack}</p>
        )}
      </div>

      <div className={styles.detail}>
        <label className={styles.label}>Defense:</label>
        <input
        className={styles.input}
          type="text"
          value={input.value}
          name="defense"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.defense &&(
            <p className={styles.danger}>{errors.defense}</p>
        )}
      </div>

      <div className={styles.detail}>
        <label className={styles.label}>Weight:</label>
        <input
      className={styles.input}
          type="text"
          value={input.value}
          name="weight"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.weight &&(
            <p className={styles.danger}>{errors.weight}</p>
        )}
      </div>

      <div className={styles.detail}>
        <label className={styles.label}>Height:</label>
        <input
        className={styles.input}
          type="text"
          value={input.value}
          name="height"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.height &&(
            <p className={styles.danger}>{errors.height}</p>
        )}
      </div>

      <div className={styles.detail}>
        <label className={styles.label}>Image:</label>
        
        <input
         className={styles.input}
          type="text"
          value={input.value}
          name="img"
          onChange={(e) => handleChange(e)}
          required
        ></input>
         {errors.img &&(
            <p className={styles.danger}>{errors.img}</p>
        )}
      </div>

      <select onChange={(e) => handleSelect(e)} className={styles.select}>
        <option value="types">Type</option>
        {types.map((e) => (
          <option value={e.name}>{e.name}</option>
        ))}
      </select>
      <ul>
        <li className={styles.li}>{input.types.map((e) => e + " , ")}</li>
      </ul>
      <div>
        <button type="submit" className={styles.button}>Create Pokemon</button>
      </div>
    </form>
  </div>
);

}