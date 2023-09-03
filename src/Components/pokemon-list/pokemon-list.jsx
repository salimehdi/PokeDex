import './pokemon-list.css'
import { useEffect, useState , use } from 'react';
import Pokedex from '../pokedex/pokedex'
import axios from 'axios'
import Search from '../search/search';
function PokeList (){

    // const [pokedexUrl , setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    // const [nextUrl , setNextUrl] = useState("")
    // const [prevUrl , setPrevUrl] = useState("")
    // const [pokemonList , setPokemonList] = useState([])
    // const [isLoading , setIsLoading] = useState(true)

    const  [pokemonListState , setPokemonListState] = useState({
        pokedexUrl:"https://pokeapi.co/api/v2/pokemon",
        nextUrl:'',
        prevUrl:'',
        pokemonList:[],
        isLoading:true
    })

    async function downloadPokemons(){
        setPokemonListState((state)=>({ ... state , isLoading:true}))
        const response = await axios.get(pokemonListState.pokedexUrl)
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url))
        const pokeData = await axios.all(pokemonResultPromise);
        setPokemonListState((state)=>({ ... state , nextUrl:response.data.next , prevUrl:response.data.previous}))
        const pokeListResult =  pokeData.map((pokemonData)=>{
            const pokemon = pokemonData.data;
            return {
                id : pokemon.id ,
                name : pokemon.name ,
                image : (pokemon.sprites.other)? pokemon.sprites.other["official-artwork"].front_shiny :
                pokemon.sprites.front_default,
                types : pokemon.types
            }
        })
        setPokemonListState((state)=>({ ... state , pokemonList: pokeListResult , isLoading:false}))
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])
    
    
    return (
        <>
        
        {/* <Search/> */}
         <div className='pokelist-wrapper'>
            <div className='pokelist-wrapper-heading'>Pokemon List</div>
            <div className='card-wrapper'>
            {(pokemonListState.isLoading)?'Loading....':
               pokemonListState.pokemonList.map((p)=><Pokedex key={p.id} name={p.name} image={p.image} id={p.id}/>)
            }
            </div>
            <div className='controls'>
                <button disabled={pokemonListState.prevUrl === null} onClick={()=>{
                    const urlToSet = pokemonListState.prevUrl
                    setPokemonListState({... pokemonListState, pokedexUrl:urlToSet})
                    }} >Prev</button>
                <button disabled={pokemonListState.nextUrl === null} onClick={()=>{
                    const urlToSet = pokemonListState.nextUrl
                    setPokemonListState({... pokemonListState, pokedexUrl:urlToSet})
                    }} >Next</button>
            </div>
         </div>
        </>
    )
}
export default PokeList 