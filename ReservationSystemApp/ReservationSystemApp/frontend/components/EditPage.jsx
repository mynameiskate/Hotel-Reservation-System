import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hotelActions } from '../actions/hotelActions.js';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
    }

}

const mapProps = (state) => {
    return {
        currentInfo: state.hotels.info     
    }
}

export default connect(mapProps)(EditPage);