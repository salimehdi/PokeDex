import {FaSearch} from 'react-icons/fa'
function Search () {
    return (
        <div className='search-bar' >
        <FaSearch className='search-icon'/>
        <input type="text" id="search-bar-input" />
        </div> 
    )
}
export default Search