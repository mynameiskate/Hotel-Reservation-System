import React from 'react';
import { Link } from 'react-router-dom';

import { links } from '../config/links';

const Header = ( { isAdmin, loggedIn, onSignOut } ) => (
    <div className="header">
        <Link to='/' className="logo"/>
        <div className="nav">
            { loggedIn
             ?  <Link to={ links.PROFILE_PAGE }>
                    My profile
                </Link>
             :  <div>
                    <Link to={ links.SIGN_IN_PAGE } >
                        Log in
                    </Link>
                    <Link to={ links.SIGN_UP_PAGE } >
                        Sign up
                    </Link>
                </div>
            }
            <Link to={ links.HOTEL_ID_SEARCH_PAGE() } >
                Hotels
            </Link>
            { isAdmin &&
                <Link to={ links.ADMIN_PAGE } >
                    For administrator
                </Link>
            }
            <Link to="">About us</Link>
            { loggedIn &&
                <Link
                    to={""}
                    onClick={onSignOut}
                >
                    Sign out
                </Link>
            }
        </div>
    </div>
)

export default Header;