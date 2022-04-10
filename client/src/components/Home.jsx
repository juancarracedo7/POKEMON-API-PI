import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPoke, filteredByTypes, getAllTypes, filteredBycreate,orderByAz, orderByAttack } from "../actions/index";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './Home.module.css'
import LoadingHome from "./LoadingHome";

export default function Home(){
  const dispatch = useDispatch();
  const allpoke = useSelector((state) => state.pokemons);
  console.log('pokemones',allpoke)
  const allTypes= useSelector((state) => state.types)
  console.log('tipos',allTypes)
  const [actualPage, setActualPage] = useState(1) // pagina inicial 1
  const [pokePage, setPokePage] = useState(12) // cuantos personajes por pagina
  const lastPoke = actualPage * pokePage // pagina actual por cantidad de personajes por pagina ej=12
  const firstPoke = lastPoke - pokePage // 12-12 = 0
  const actualPoke = allpoke.slice(firstPoke, lastPoke)

  const paginadoPoke = (pageNumber) =>{
      setActualPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllPoke());
  }, [dispatch]);

  useEffect(() =>{
      dispatch(getAllTypes())
  }, [dispatch])

  const [orden, setOrden] = useState("");
  const [type, setType] = useState('')
  const [created, setCreated]= useState('')
  const [attack, setAttack] = useState('')

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPoke());
  }

  function handleTypes(e){
    e.preventDefault(e);
    dispatch(filteredByTypes(e.target.value));
    setActualPage(1)
    setType(e.target.value)
  }

  function handleCreated(e){
    e.preventDefault(e);
    dispatch(filteredBycreate(e.target.value));
    setActualPage(1)
    setCreated(e.target.value)
  }

  function handleOrder(e){
    e.preventDefault(e);
    dispatch(orderByAz(e.target.value));
    setActualPage(1) // ordeno desde la pagina 1
        setOrden(e.target.value) // lo seteo ordenado asc o desc, para que me haga la modi en el render
  }

  function handleAttack(e){
    e.preventDefault(e);
    dispatch(orderByAttack(e.target.value));
    setActualPage(1)
    setAttack(e.target.value)
  }

  if(allpoke.length === 0){
    return(
        <div>
        <LoadingHome />
        </div>
    ) 
 }else{
  
  return (
    <div className={styles.home}>
      <h1 className={styles.h1}>ARE YOU READY?</h1>
      <button onClick={(e) => handleClick(e)} className={styles.reload}>Reload</button>
      <div>
        <SearchBar></SearchBar>
        <Link to='/pokemon' className={styles.link} ><h2>Create Pokemon</h2></Link>
      </div>

      <div>
        <select onChange={e => handleOrder(e)} className={styles.select}>
          <option value="All">Alphabet</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
        <select onChange={e => handleAttack(e)} className={styles.select}>
          <option value="All">Attack</option>
          <option value="asc">higher</option>
          <option value="des">lower</option>
        </select>
        <select onChange={e =>handleCreated(e)} className={styles.select}>
            <option value="All">All</option>
            <option value="defaultPoke">ApiPoke</option>
            <option value="createdInDb">Created</option>
          </select>
      </div>
      <p>Filter</p>
      <div>
        <select onChange={(e) => handleTypes(e)} className={styles.select}>
        <option value="types">Types</option>
          {allTypes &&
            allTypes.map((t) => (
              <option  value={t.name} key={t.name}>
                {t.name}
              </option>
              
            ))}
            

          
        </select>
        
        <Paginado
          pokePage={pokePage}
          allPoke={allpoke.length}
          paginadoPoke={paginadoPoke}
        />
          
        {actualPoke?.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/pokemon/${e.id}`} className={styles.link}>
               <Card image={e.img} name={e.name} types={e.types} />
              </Link>
              
            </div>
          );
        })}
      </div>
    </div>
  );
      }
}

