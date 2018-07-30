import React from 'react';
import { Link } from 'react-router-dom';
import HotelInfo from './HotelInfo.jsx';
import { links } from '../config/links.js';

const NavigationBar = ( {currentPage, nextPage, setCurrentPage} ) => (
    <div>        
        {   
            (currentPage - 1 > 0) &&
            <Link to={ links.HOTEL_ID_SEARCH_PAGE(currentPage - 1) } onClick={() => setCurrentPage(currentPage - 1)} >
                back
            </Link>  
        }
        <h4>{currentPage}</h4>
        {   nextPage &&
            <Link to={ links.HOTEL_ID_SEARCH_PAGE(nextPage) } onClick={() => setCurrentPage(nextPage)}>
                forward
            </Link>  
        }
    </div>
)

export default NavigationBar;