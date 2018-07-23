import React from 'react';
import { connect } from 'react-redux'; 
import LoginField from '../components/LoginField.jsx';
import  UserActions  from '../actions/UserActions.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.sendSignInRequest = this.sendSignInRequest.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(UserActions.getInfo());
    }

    hideLoginField = (info) => {    
    }

    sendSignInRequest(info) {      
        this.props.dispatch(UserActions.logIn(info));   
    }

    render() {
        const { userInfo, error, isValid, isSent } = this.props;
        return(
            <div>
            {
                <LoginField sendRequest={(data) => this.sendSignInRequest(data)}
                            onCancelClick={this.hideLoginField} />   
            }
            </div>
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