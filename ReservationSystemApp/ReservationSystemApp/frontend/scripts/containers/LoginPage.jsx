import React from 'react';
import { Redirect } from 'react-router-dom';
import { links } from '../config/links';
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
        const { error, redirect } = this.props;
        return(
            <div>
                {
                    !redirect?
                        <div>
                            <LoginField sendRequest={(data) => this.sendSignInRequest(data)}
                                onCancelClick={this.hideLoginField} />
                            { error && <h2> Wrong username or password! </h2>}
                        </div>
                    : <Redirect to={links.PROFILE_PAGE}/>
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