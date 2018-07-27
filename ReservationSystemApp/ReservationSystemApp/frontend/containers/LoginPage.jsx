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
        //this.props.dispatch(UserActions.getInfo());
    }

    sendSignInRequest(info) {      
        this.props.dispatch(UserActions.logIn(info));   
    }

    render() {
        const { error } = this.props;
        return(
            <div>
                <LoginField sendRequest={(data) => this.sendSignInRequest(data)}
                            onCancelClick={this.hideLoginField} />   
                { error && <h2> Wrong username or password! </h2>}
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

export default connect(mapStateToProps)(LoginPage); 