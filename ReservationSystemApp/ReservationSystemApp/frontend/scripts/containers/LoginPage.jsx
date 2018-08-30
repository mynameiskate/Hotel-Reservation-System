import React from 'react';
import { history } from '../store/store';
import { connect } from 'react-redux';

import LoginField from '../components/users/LoginField';
import  UserActions  from '../actions/UserActions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.sendSignInRequest = this.sendSignInRequest.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(UserActions.reset());
        this.props.dispatch(UserActions.getInfo());
    }

    sendSignInRequest(info) {
        this.props.dispatch(UserActions.logIn(info));
    }

    render() {
        const { error } = this.props;
        return(
            <div>
                {
                    <div className="formFields">
                        <LoginField
                            sendRequest={(data) => this.sendSignInRequest(data)}
                            onCancelClick={history.goBack}
                        />
                        { error && <h2> Wrong username or password! </h2>}
                    </div>
               }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid,
        redirect: state.users.redirect
    }
}

export default connect(mapStateToProps)(LoginPage);