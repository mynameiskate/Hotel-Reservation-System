import React from 'react';
import { connect } from 'react-redux'; 
import  UserActions  from '../actions/UserActions.js';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(UserActions.getInfo());
    }

    render() {
        const { userInfo } = this.props;
        return(
            <div>
                {userInfo && <h1>Hi {userInfo.name}</h1> }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid
    }
}

export default connect(mapStateToProps)(UserPage); 