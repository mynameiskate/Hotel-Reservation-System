import React from 'react';
import { connect } from 'react-redux';
import  UserActions  from '../actions/UserActions';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.getProfile();
    }

    componentDidMount() {
        this.props.reset();
    }

    render() {
        const { userInfo } = this.props;
        return(
            <div>
                {userInfo
                 &&
                 <h1>Welcome, {userInfo.shortName ||
                               userInfo.email ||
                               (userInfo.isAdmin? 'guest' : 'admin')}
                </h1>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.userInfo,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch(UserActions.reset()),
        getProfile: () => dispatch(UserActions.getProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);