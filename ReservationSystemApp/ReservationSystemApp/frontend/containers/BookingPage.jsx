import React from 'react';
import { connect } from 'react-redux'; 

class BookingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        <h1>Confirm booking:</h1>
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.users.info,
        room: state.rooms.room
    }
}

export default connect(mapStateToProps)(BookingPage);