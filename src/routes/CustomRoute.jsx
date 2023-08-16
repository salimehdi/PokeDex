import { Routes , Route } from "react-router-dom";
import PokeList from "../Components/pokemon-list/pokemon-list";
import PokemonDetails from "../Components/pokemonDetails/pokemonDetails";
function CustomRouter () {
    return (
        <Routes>
            <Route path='/' element={<PokeList/>}/>
            <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
        </Routes>
    )
}

export default CustomRouter