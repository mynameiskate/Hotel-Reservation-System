import React from 'react';
import { connect } from 'react-redux'; 
import LoginField from '../components/LoginField.jsx';
import { UserActions } from '../actions/UserActions.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.hideLoginField = this.hideLoginField.bind(this);
        this.sendLoginRequest = this.sendSignInRequest.bind(this);
    }

    hideLoginField = (info) => {    
    }

    sendSignInRequest = (info) => {      
        this.props.dispatch(UserActions.signIn(info));   
    }

    render() {
        const { userInfo, error, isValid, isSent } = this.props;

        return(
            <LoginField sendRequest={this.sendSignInRequest}
                        onCancelClick={this.hideLoginField}
            />        
        );
    }

}

const mapStateToProps = (state) => {
    return {
        userInfo: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid
    }
}

export default connect(mapStateToProps)(LoginPage); 