import React from 'react';
import { connect } from 'react-redux'; 

class LoginPage extends React.Component {

}

const mapStateToProps = (state) => {
    return {
        info: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent
    }
}

export default connect(mapStateToProps)(LoginPage); 