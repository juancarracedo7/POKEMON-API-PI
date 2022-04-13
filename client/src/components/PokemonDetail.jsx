import React from "react";
import { clearId, getPokeDetail } from "../actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "./Loading";
import styles from './PokemonDetail.module.css'

export default function PokemonDetail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(() =>{
      dispatch(getPokeDetail(id)) //accedo al id con el params(del detalle)
      dispatch(clearId())
  }, [dispatch,id])

  const detailPokemon = useSelector((state) => state.detail)
  console.log('detalles',detailPokemon)

  return(
      <div className={styles.detail}>
          {
              detailPokemon.length > 0 ?
              <div>
        
                  <h1 className={styles.h1}>{detailPokemon[0].name}</h1>
                  <img className={styles.img} src={detailPokemon[0].img && detailPokemon[0].img} alt="not found" />
                  <p className={styles.p}>Hp {detailPokemon[0].hp}</p>
                  <p className={styles.p}>Attack {detailPokemon[0].attack}</p>
                  <p className={styles.p}>Defense {detailPokemon[0].defense}</p>
                  <p className={styles.p}>Weight {detailPokemon[0].weight}</p>
                  <p className={styles.p}>Height {detailPokemon[0].height}</p>
                  <h4 className={styles.h4}>{!detailPokemon[0].createdInDb ? detailPokemon[0].types.map(el=> el + "  " ) : detailPokemon[0].tipos.map(el => el.name + "   ")}</h4>
                  
              </div> : <Loading></Loading>
          }
          <Link to='/home'><button className={styles.button}>Go Back Home</button></Link>
      </div>
  )
}
