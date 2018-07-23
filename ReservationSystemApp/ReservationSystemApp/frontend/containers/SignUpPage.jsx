import React from 'react';
import { connect } from 'react-redux'; 
import SignUpField from '../components/SignUpField.jsx';
import  UserActions  from '../actions/UserActions.js';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.sendSignUpRequest = this.sendSignUpRequest.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(UserActions.getInfo());
    }

    hideSignUpField = (info) => {    
    }

    sendSignUpRequest(info) {
        let user = {
            email: info.email,
            password: info.password,
            shortName: info.shortName,
            fullName: info.fullName
        }
        this.props.dispatch(UserActions.signUp(user));
    }

    render() {
        const { userInfo, error, isValid, isSent } = this.props;
        return(
            <div>
                <SignUpField sendRequest={(data) => this.sendSignUpRequest(data)}
                             onCancelClick={this.hideSignUpField}/>  
                {error & <h2>Failed to sign up, try again?</h2>}    
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

export default connect(mapStateToProps)(SignUpPage); 