import './pokemon-list.css'
import { useEffect, useState } from 'react';
import Pokedex from '../pokedex/pokedex'
import axios from 'axios'
import Search from '../search/search';
function PokeList (){

    const [pokedexUrl , setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl , setNextUrl] = useState("")
    const [prevUrl , setPrevUrl] = useState("")
    const [pokemonList , setPokemonList] = useState([])
    const [isLoading , setIsLoading] = useState(true)

    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl)
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url))
        const pokeData = await axios.all(pokemonResultPromise);
        console.log(response.data)
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
        setPokemonList(pokeData.map((pokemonData)=>{
            const pokemon = pokemonData.data;
            return {
                id : pokemon.id ,
                name : pokemon.name ,
                image : (pokemon.sprites.other)? pokemon.sprites.other["official-artwork"].front_shiny :
                pokemon.sprites.front_default,
                types : pokemon.types
            }
        }))
        setIsLoading(false);

    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedexUrl])
    
    
    return (
        <>
        
        {/* <Search/> */}
         <div className='pokelist-wrapper'>
            <div className='pokelist-wrapper-heading'>Pokemon List</div>
            <div className='card-wrapper'>
            {(isLoading)?'Loading....':
               pokemonList.map((p)=><Pokedex key={p.id} name={p.name} image={p.image} id={p.id}/>)
            }
            </div>
            <div className='controls'>
                <button disabled={prevUrl === null} onClick={()=>setPokedexUrl(prevUrl)} >Prev</button>
                <button disabled={nextUrl === null} onClick={()=>setPokedexUrl(nextUrl)} >Next</button>
            </div>
         </div>
        </>
    )
}
export default PokeList 