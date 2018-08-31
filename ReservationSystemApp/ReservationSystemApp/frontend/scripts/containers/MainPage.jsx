import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { links } from '../config/links';
import Footer from '../components/Footer';
import Header from '../components/Header';
import UserActions from '../actions/UserActions';
import  HotelSearchActions from '../actions/HotelSearchActions';
import TopHotelsList from '../components/hotels/TopHotelsList';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTopHotels()
    }

    render() {
        const { error, isAdmin, loggedIn, signedUp, signOut, info } = this.props;
        return (
            <div>
                <Header
                    isAdmin={isAdmin}
                    loggedIn={loggedIn}
                    signedUp={signedUp}
                    onSignOut={signOut}
                />
                <TopHotelsList
                    imageLinkCreator={this.props.imageLinkCreator}
                    info={info}
                />
                <Footer/>
                { error  && <h3>Loading error</h3> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.isAdmin,
        info: state.search.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected,
        loggedIn: state.users.loggedIn,
        signedUp: state.users.signedUp
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        signOut: () => UserActions.signOut(),
        getTopHotels: () => HotelSearchActions.getTopHotels()
    }, dispatch);

    return {
        ...bindedCreators,
        imageLinkCreator: (imageId) => (
            links.IMAGE_DOWNLOAD_PATH(imageId)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);