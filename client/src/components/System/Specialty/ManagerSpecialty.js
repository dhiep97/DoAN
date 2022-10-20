import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManagerSpecialty extends Component {

    render() {
        

        return (
            <div>Specialty</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
