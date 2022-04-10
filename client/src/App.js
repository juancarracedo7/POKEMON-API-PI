import './App.css';
import {Route} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate'
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    
    <div className="App">
      <Route exact path='/'>
        <Landing></Landing>
      </Route>
      <Route exact path='/home'>
        <Home></Home>
      </Route>
      <Route exact path='/pokemon'>
        <PokemonCreate></PokemonCreate>
      </Route>
      <Route exact path='/pokemon/:id'>
        <PokemonDetail></PokemonDetail>
      </Route>
        
     
    </div>
    
  );
}

export default App;
