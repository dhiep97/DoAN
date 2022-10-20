import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManagerClinic extends Component {

    render() {
        

        return (
            <div>Clinic</div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerClinic);
