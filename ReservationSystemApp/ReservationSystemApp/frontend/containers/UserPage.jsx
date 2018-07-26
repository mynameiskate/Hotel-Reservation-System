import React from 'react';
import { connect } from 'react-redux'; 
import  UserActions  from '../actions/UserActions.js';
import  HotelActions from '../actions/HotelActions.js';
import  SearchFilter  from '../components/SearchFilter.jsx';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.dispatch(UserActions.getProfile());
    }

    sendSearchRequest = (info) => {
    }


    render() {
        const { userInfo } = this.props;
        return(
            <div>
                {userInfo && <h1>Welcome, {userInfo.shortName ||
                                      userInfo.email ||
                                     (userInfo.isAdmin? "guest" : "admin")}
                            </h1> }
                <SearchFilter sendRequest={(data) => this.sendSearchRequest(data)}/> 
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.userInfo,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid
    }
}

export default connect(mapStateToProps)(UserPage); 