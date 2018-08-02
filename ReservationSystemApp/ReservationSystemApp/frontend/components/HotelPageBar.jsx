import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../config/links.js';

const HotelPageBar = ( {currentPage, nextPage, setCurrentPage} ) => (
    <div>        
        {   
            (currentPage - 1 > 0) &&
            <Link to={ links.HOTEL_ID_SEARCH_PAGE(currentPage - 1) } onClick={() => setCurrentPage(currentPage - 1)} >
                back
            </Link>  
            //<button type='button' onClick={() => setCurrentPage(currentPage - 1)}>back</button>
        }
        <h4>{currentPage}</h4>
        {   nextPage &&
           // <button type='button' onClick={() => setCurrentPage(nextPage)}>forward</button>
            <Link to={ links.HOTEL_ID_SEARCH_PAGE(nextPage) } onClick={() => setCurrentPage(nextPage)}>
                forward
            </Link>  
        }
    </div>
)

export default HotelPageBar;