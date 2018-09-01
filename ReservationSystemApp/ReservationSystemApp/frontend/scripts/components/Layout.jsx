import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
    render() {
        const { loggedIn, isAdmin, onSignOut } = this.props;
        return (
            <React.Fragment>
                <Header
                    loggedIn={loggedIn}
                    isAdmin={isAdmin}
                    onSignOut={onSignOut}
                />
                <div className="content">
                    {this.props.children}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Layout;