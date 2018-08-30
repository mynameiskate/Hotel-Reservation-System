import React from 'react';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { error, isAdmin, loggedIn, signedUp } = this.props;
        return (
            <div>
                <Header
                    isAdmin={isAdmin}
                    loggedIn={loggedIn}
                    signedUp={signedUp}
                />
                <div className="topHotels">
                    <p className="topHotelsTitle">Top Hotels</p>
                    <div className="topHotelsRow">
                        <div className="hotelCard">
                            <div className="topHotelImg">
                                <img  src="./assets/hotel1.jpg"/>
                            </div>
                                <p className="topHotelTitle">Hotel Name</p>
                                <button className="hotelViewBtn">View</button>
                        </div>
                        <div className="hotelCard">
                            <div className="topHotelImg">
                                <img  src="./assets/hotel2.jpeg"/>
                            </div>
                            <p className="topHotelTitle">Hotel Name</p>
                            <button className="hotelViewBtn">View</button>
                        </div>
                        <div className="hotelCard">
                            <div className="topHotelImg">
                                <img  src="./assets/hotel3.jpg"/>
                            </div>
                            <p className="topHotelTitle">Hotel Name</p>
                            <button className="hotelViewBtn">View</button>
                        </div>
                    </div>
                </div>
                <Footer/>
                { error  && <h3>Loading error</h3> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.isAdmin,
        info: state.hotels.info,
        error: state.hotels.error,
        isLoading: state.hotels.isLoading,
        removing: state.hotels.removing,
        selected: state.hotels.selected,
        loggedIn: state.users.loggedIn,
        signedUp: state.users.signedUp
    }
}

export default connect(mapStateToProps)(MainPage);