import React from 'react';
import { Link } from 'react-router-dom';

import { links } from '../config/links';

const Header = ( { isAdmin, loggedIn } ) => (
    <div className='headerContainer'>
        <div className='header'>
            <div className='logo'/>
            <div className='nav'>
                    <div>
                        <Link to={ links.SIGN_IN_PAGE } >
                            Log in
                        </Link>
                        <Link to={ links.SIGN_UP_PAGE } >
                            Sign up
                        </Link>
                        <Link to={ links.PROFILE_PAGE } >
                            My profile
                        </Link>
                    </div>
                <Link to={ links.HOTEL_ID_SEARCH_PAGE(1) } >
                    Hotels
                </Link>
                { isAdmin &&
                    <Link to={ links.ADMIN_PAGE } >
                        For administrator
                    </Link>
                }
                <Link to=''>About us</Link>
            </div>
        </div>
        <div className='bannerText'>
            <p className='bannerTextTitle'>Welcome to Book It!</p>
            <p>hundreds of hotels are waiting just for you.</p>
            <button className='findBtn'>Find hotel</button>
        </div>
    </div>
)

export default Header;