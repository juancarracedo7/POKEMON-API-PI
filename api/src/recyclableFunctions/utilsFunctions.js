const axios = require('axios')
const { Pokemon, Tipo } = require('../db')




async function getPokeApi (){
    try {
        let callApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60') // llamado api
        // console.log('todo de la api',callApi.data.results)
        let subCallApi = callApi.data.results.map(e => axios.get (e.url)) // obtengo todas url segundo llamado
        // console.log('url todos los pokes', subCallApi)
            subCallApi = await Promise.all(subCallApi) // ingreso en la segunda url
            console.log('info de la subcall',subCallApi)
    
        let pokeInfo = subCallApi.map(e =>{
            return{             // me traigo los datos que necesito
                id : e.data.id,
                name: e.data.name,
                hp: e.data.stats[0].base_stat,
                attack: e.data.stats[1].base_stat,
                defense: e.data.stats[2].base_stat,
                height: e.data.height,
                weight: e.data.weight,
                img: e.data.sprites.front_default,
                types: e.data.types.map(e => e.type.name) ,
                createdInDataBase: false,
            }
        })
        // console.log('info formateada',pokeInfo)
        return pokeInfo
    } catch (error) {
        console.log(error)
    }
   
}

async function getPokeDb(){
    return await Pokemon.findAll({ // me trae la info de db de Pokemon
        include:{
            model: Tipo, // conecto los modelos
            attributes:['name'], // me traigo el atributo name de type
            through:{
                attributes : [],
            }
        } 
    })
    
}

async function getAllPoke(){
    let pokeApi = await getPokeApi() // llamo a getPokeApi
    let pokeDb = await getPokeDb() // llamo a getPokeDb
    let allPoke = pokeApi?.concat(pokeDb) // concateno las 2 llamadas

    return allPoke // devuelvo las dos llamadas
}


module.exports = {getPokeApi, getPokeDb, getAllPoke}