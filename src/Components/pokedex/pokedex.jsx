import { Link } from 'react-router-dom'
import './pokedex.css'
function Pokedex ({name , image ,id}){
    return (
        <Link to={`/pokemon/${id}`}>
        <div className='each-poke-card'>
            <h3>{name}</h3>
            <img src={image}/>
        </div>
        </Link>
    )
}
export default Pokedex 