import React from 'react';
import { Link } from 'react-router-dom';

import { links } from '../config/links';

const Header = ({ isAdmin, loggedIn, onSignOut }) => {
    <div className="header">
            <div className="logo"/>
            <div className="nav">
                    <div>
                        { loggedIn
                          ? <div>
                                <Link to={ links.PROFILE_PAGE }>
                                    My profile
                                </Link>
                                <Link to={""}>
                                    Sign out
                                </Link>
                            </div>
                          : <div>
                                <Link to={ links.SIGN_IN_PAGE } >
                                    Log in
                                </Link>
                                <Link to={ links.SIGN_UP_PAGE } >
                                    Sign up
                                </Link>
                            </div>
                        }
                    </div>
                <Link to={ links.HOTEL_ID_SEARCH_PAGE() } >
                    Hotels
                </Link>
                { isAdmin &&
                    <Link to={ links.ADMIN_PAGE } >
                        For administrator
                    </Link>
                }
                <Link to="">About us</Link>
            </div>
    </div>
}

export default Header;