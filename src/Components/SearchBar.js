import React from 'react';

const SearchBar = ({ state, setState }) => {
    return (
        <input type='text' placeholder='Search for registered users on the site...' className='searchbar' value={state} onChange={e => setState(e.target.value)}/>
    )
}

export default SearchBar;