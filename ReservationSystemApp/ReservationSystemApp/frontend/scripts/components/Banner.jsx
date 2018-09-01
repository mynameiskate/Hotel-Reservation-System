import React from 'react';
import { Link } from 'react-router-dom';

import { links } from '../config/links';

const Banner = () => (
    <div className="bannerText">
        <p className="bannerTextTitle">Welcome to Book It!</p>
        <p>hundreds of hotels are waiting just for you.</p>
        <Link className="findBtn" to={ links.HOTEL_ID_SEARCH_PAGE() } >
            Find hotel
        </Link>
    </div>
)

export default Banner;