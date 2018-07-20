import React from 'react';
import { connect } from 'react-redux'; 

class LoginPage extends React.Component {

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