import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import './pokemonDetails.css'
import {FaArrowLeft} from 'react-icons/fa'

function PokemonDetails () {
    
    const [isLoading , setIsLoading] = useState(true)
    const [pokemon , setPokemon] = useState([])
    const {id} = useParams();
    async function downloadPokemon () {
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other["official-artwork"].front_shiny,
            height:response.data.height,
            weight:response.data.weight,
            types:response.data.types.map((t)=>t.type.name)
        })
        setIsLoading(false)
    }
    useEffect(()=>{
        downloadPokemon()
        
    },[])
    return (
    

        
        (isLoading)?'Loading....':
               
        (<>
        <img className="inner-pokemon-image" src={pokemon.image} />
        <div className="pokemon-details">
        <h2>Name: {pokemon.name}</h2>
        <h3>Height: {pokemon.height}cm</h3>
        <h3>Weight: {pokemon.weight}kg</h3>
        {(pokemon.types) && (
            <h3>{pokemon.types.map((t)=> `${t} ` )}</h3>
        )
        }
        <Link to="/" ><button className="go-back"><FaArrowLeft/></button></Link>
        </div>
        
        </>
        )
        

    
    )
}

export default PokemonDetails