import axios from 'axios'
export const GET_ALL_POKE = 'GET_ALL_POKE'
export const FILTER_TYPES = 'FILTER_TYPES'
export const GET_ALL_TYPES = 'GET_ALL_TYPES'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_AZ = 'ORDER_AZ'
export const ORDER_ATTACK = 'ORDER_ATTACK'
export const GET_POKE_NAME = 'GET_POKE_NAME'
export const POST_POKEMON = 'POST_POKEMON'
export const GET_DETAILS = 'GET_DETAILS'
export const CLEAR_ID = 'CLEAR_ID'


export function getAllPoke() {
    return async (dispatch) => {
        var json = await axios.get("/pokemon");
        return dispatch({
            type: "GET_ALL_POKE",
            payload: json.data
        })
    }
};

// export const getAllPoke = () => dispatch =>{
//     return fetch('http://localhost:3001/pokemon')
//     .then(response => response.json())
//     .then(json => dispatch({
//         type:GET_ALL_POKE,
//         payload:json
        
//     }))  
// }
export function getAllTypes() {
    return async function (dispatch) {
        var json = await axios.get("/tipo")
        return dispatch({
            type: "GET_ALL_TYPES",
            payload: json.data,
        })
    }
};
// export const getAllTypes = ()=> async dispatch =>{
//     const response = await fetch('http://localhost:3001/tipo')
//     const json = await response.json()
//     return dispatch({
//         type: GET_ALL_TYPES,
//         payload: json
//     })

// }
export const getPokeName = (name)=> async dispatch=>{
    try {
        const response = await fetch(`/pokemon?name=${name}`)
        const json = await response.json()
        return dispatch({
            type: GET_POKE_NAME,
            payload: json
        })
    } catch (error) {
        console.log(error)
        alert('no se escontro ese pokemon')
    }
  
}

export function postPokemon(payload) {
    console.log('payload',payload)
    return async function (dispatch) {
        var json = await axios.post("/pokemon", payload)
       
        dispatch({
            type: "POST_POKEMON",
            payload:json
        });
    }
};

export const filteredByTypes = (payload) => {
    // console.log('payload',payload)
    return { type: FILTER_TYPES, payload };
}

export const filteredBycreate = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export const orderByAz = (payload)=> {
return {
    type: ORDER_AZ,
    payload
}
}

export const orderByAttack = (payload) => {
    return {
        type: ORDER_ATTACK,
        payload
    }
}

export function getPokeDetail(id){
return async function(dispatch){
    try{
        var json = await axios.get(`/pokemon/${id}`)
  return dispatch({
      type: "GET_DETAILS",
      payload: json.data
  })
  } catch(error){
      console.log(error)
  }
}
}

export function clearId(){
    return{
        type:CLEAR_ID
    }
}

