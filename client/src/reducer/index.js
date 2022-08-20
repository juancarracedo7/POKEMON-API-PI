
import {
  GET_ALL_POKE,
  FILTER_TYPES,
  GET_ALL_TYPES,
  FILTER_CREATED,
  ORDER_AZ,
  ORDER_ATTACK,
  GET_POKE_NAME,
  POST_POKEMON,
  GET_DETAILS,
  CLEAR_ID,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail:[],
  create:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKE:
      return {
        ...state,
        pokemons: action.payload, // me traigo todos los pokemons gracias a la action
        allPokemons: action.payload,
      };
    case FILTER_TYPES:
      const allPoke = state.allPokemons;
      const typesFiltered =
        action.payload === "types"
          ? allPoke
          : allPoke.filter((e) => e.types?.includes(action.payload));

      return {
        ...state,
        pokemons: typesFiltered,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_CREATED:
      const allPokemon = state.allPokemons;
      const pokefilter =
        action.payload === "createdInDb"
          ? allPokemon.filter((e) => e.createdInDb)
          : allPokemon.filter((e) => !e.createdInDb);

          const Db =  action.payload === "createdInDb"
          ? allPokemon.filter((e) => e.createdInDb) : ''
      return {
        ...state,
        pokemons: action.payload === "All" ? allPokemon : pokefilter,
        create: Db
      };
    case ORDER_AZ:
      const allpoke1 = state.allPokemons;
      const pokeSort =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        pokemons: action.payload === "All" ? allpoke1 : pokeSort,
      };
    case ORDER_ATTACK:
      const allpoke2 = state.allPokemons;
      const pokeSort2 =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) return 1;
              if (b.attack > a.attack) return -1;
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) return -1;
              if (b.attack > a.attack) return 1;
              return 0;
            });

      return {
        ...state,
        pokemons: action.payload === "All" ? allpoke2 : pokeSort2,
      };

    case GET_POKE_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };
    case POST_POKEMON:
      return {
        ...state,
      };
      case GET_DETAILS:
          return{
              ...state,
              detail: action.payload
          }
          case CLEAR_ID :
                        return{
                                ...state,
                                detail:[]
                        }     
                       
                

    default:
      return state;
  }
}

export default rootReducer;
